import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from '../login/login.component';
import { MatCardModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService;
  let mockRouter;

  beforeEach(async(() => {
    mockAuthService = jasmine.createSpyObj(['login']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, MatCardModule, MatInputModule, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // afterEach(() => {
  //   if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
  //     (fixture.nativeElement as HTMLElement).remove();
  //   }
  // })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
