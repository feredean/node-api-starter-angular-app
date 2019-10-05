import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatDialogModule } from '@angular/material';
import { PasswordFormComponent } from '../shared/password-form/password-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, Profile } from '../core/services/auth.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let PROFILE: Profile;
  let mockAuthService;

  beforeEach(async(() => {
    PROFILE = {
      avatar: 'https://gravatar.com/avatar/5985c7230839f53ead828b47b6f01c32?s=200&d=retro',
      profile: {
        gender: undefined,
        location: undefined,
        name: 'username',
        picture: undefined,
        website: undefined
      }
    };
    mockAuthService = jasmine.createSpyObj(['updateProfile', 'changePassword', 'deleteAccount']);
    mockAuthService.profileChange$ = of(PROFILE);

    TestBed.configureTestingModule({
      declarations: [ProfileComponent, PasswordFormComponent],
      imports: [
        ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
        MatSnackBarModule, MatDialogModule, RouterTestingModule, NoopAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
