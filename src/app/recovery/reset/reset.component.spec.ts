import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetComponent } from './reset.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordFormComponent } from 'src/app/shared/password-form/password-form.component';
import { MatCardModule, MatInputModule, MatFormFieldModule, MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;
  let mockAuthService;

  beforeEach(async(() => {
    mockAuthService = jasmine.createSpyObj(['resetPassword'])
    TestBed.configureTestingModule({
      declarations: [ResetComponent, PasswordFormComponent],
      imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatFormFieldModule, RouterTestingModule, MatSnackBarModule, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
