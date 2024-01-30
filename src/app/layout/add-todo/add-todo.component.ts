import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { Todo } from 'src/app/models/todo';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  todosCollection: AngularFirestoreCollection<Todo>;
  user: User | null = null;
  newTodoTitle = '';
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
  ) {
    this.todosCollection = afs.collection<Todo>('todos');
  }

  ngOnInit(): void {
    this.getAuthUser();
  }
  getAuthUser() {
    this.auth.user$.subscribe((user: User | null) => {
      this.user = user;
    });
  }

  addTodo() {
    if (this.newTodoTitle && this.user) {
      this.todosCollection
        .add({
          isCompleted: false,
          title: this.newTodoTitle,
          userId: this.user.uid,
        })
        .then(() => {
          this.newTodoTitle = '';
        });
    }
  }
}
