import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from 'src/app/auth/auth.service';

const MockAngularFireStore = {
  collection: () => ({ valueChanges: () => of([]), get: () => of([]) }),
  doc: () => ({ update: jasmine.createSpy(), delete: jasmine.createSpy() }),
};

const MockAuthService = {
  user$: of({ uid: 'abcd' }),
};

const MockBreakpointObserver = {
  isMatched: () => false,
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: AngularFirestore, useValue: MockAngularFireStore },
        { provide: AuthService, useValue: MockAuthService },
        { provide: BreakpointObserver, useValue: MockBreakpointObserver },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
