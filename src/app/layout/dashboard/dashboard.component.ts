import { Component } from '@angular/core';
import {
  AngularFirestore,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { BreakpointObserver } from '@angular/cdk/layout';

enum FilterState {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  items$?: Observable<any[]>;
  filteredTodos$?: Observable<any[]>;
  totalActiveTodos = 0;
  user: User | null = null;
  FilterState = FilterState;
  activeFilter: BehaviorSubject<FilterState> = new BehaviorSubject<FilterState>(
    FilterState.ALL,
  );
  isSmallScreen = false;

  constructor(
    private firestoreService: AngularFirestore,
    private authenticationService: AuthService,
    private responsiveService: BreakpointObserver,
  ) {
    this.initializeUserData();

    // Define si estamos en una pantalla pequeña o no.
    this.isSmallScreen = responsiveService.isMatched('(max-width: 375px)');
  }

  private initializeUserData(): void {
    this.authenticationService.user$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
        this.items$ = this.firestoreService
          .collection('todos', (ref) => ref.where('userId', '==', user.uid))
          .valueChanges({ idField: 'id' });
        this.items$
          .pipe(
            map(
              (items: Todo[]) =>
                items.filter((item) => !item.isCompleted).length,
            ),
          )
          .subscribe((totalActiveTodos: number) => {
            this.totalActiveTodos = totalActiveTodos;
          });
        this.getTodos();
      }
    });
  }

  isActiveFilter(filterState: FilterState) {
    return this.activeFilter.getValue() === filterState;
  }
  /**
   * Este método se encarga de filtrar las tareas (todos) basándose en el estado activo del filtro seleccionado.
   * Utiliza `combineLatest` para combinar el último valor de `items$` (lista completa de tareas) y `activeFilter`
   * (el estado actual del filtro) para determinar qué tareas deben mostrarse.
   *
   * Si el filtro activo es `FilterState.ALL`, retorna todas las tareas sin aplicar ningún filtro.
   * Si el filtro activo es `FilterState.COMPLETED`, retorna solo las tareas completadas.
   * Si el filtro activo es `FilterState.ACTIVE`, retorna solo las tareas que aún no se han completado.
   *
   * El resultado se almacena en `filteredTodos$`, que es un Observable de la lista filtrada de tareas.
   */
  getTodos() {
    if (!this.items$) {
      return;
    }

    this.filteredTodos$ = combineLatest(this.items$, this.activeFilter).pipe(
      map(([todos, currentFilter]: [Todo[], FilterState]) => {
        if (currentFilter === FilterState.ALL) {
          return todos;
        }
        return todos.filter((todo: Todo) => {
          const filterCondition =
            currentFilter === FilterState.COMPLETED ? true : false;
          return todo.isCompleted === filterCondition;
        });
      }),
    );
  }

  setFilterState(filterState: FilterState) {
    this.activeFilter.next(filterState);
  }

  /**
   * Este método se encarga de eliminar todas las tareas completadas para el usuario actual.
   * Solo se ejecuta si existe un usuario autenticado (`this.user`) y si hay tareas (`this.items$`).
   *
   * Primero, realiza una consulta a la colección de 'todos' en Firestore, filtrando por el `userId` del usuario actual
   * y por las tareas que tienen el campo `isCompleted` igual a true (tareas completadas).
   *
   * Utiliza `pipe` y `map` para transformar el resultado de la consulta (`QuerySnapshot`) en un array de documentos (`QueryDocumentSnapshot`).
   * Luego, se suscribe al resultado y para cada documento (tarea completada) llama a `doc.ref.delete()` para eliminar la tarea de Firestore.
   *
   * Este proceso elimina todas las tareas completadas del usuario actual de la base de datos.
   */
  clearCompleted() {
    if (this.user && this.items$) {
      this.firestoreService
        .collection<Todo>('todos', (ref) =>
          ref
            .where('userId', '==', this.user?.uid)
            .where('isCompleted', '==', true),
        )
        .get()
        .pipe(
          map((qs: QuerySnapshot<Todo>) => {
            return qs.docs;
          }),
        )
        .subscribe((docs: QueryDocumentSnapshot<Todo>[]) => {
          docs.forEach((doc: QueryDocumentSnapshot<Todo>) => {
            doc.ref.delete();
          });
        });
    }
  }

  setAsCompleted(todo: Todo) {
    const todoDoc = this.firestoreService.doc(`todos/${todo.id}`);
    todoDoc.update({
      isCompleted: true,
    });
  }

  deleteTodo(todo: Todo) {
    const todoDoc = this.firestoreService.doc(`todos/${todo.id}`);
    todoDoc.delete();
  }
}
