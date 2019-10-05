import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotComponent } from './forgot.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { AuthService } from 'src/app/core/services/auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ForgotComponent', () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;
  let mockAuthService;

  beforeEach(async(() => {
    mockAuthService = jasmine.createSpyObj(['forgotPassword']);
    TestBed.configureTestingModule({
      declarations: [ForgotComponent],
      imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatSnackBarModule, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
