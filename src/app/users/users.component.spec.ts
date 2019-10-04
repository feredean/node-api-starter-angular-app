import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { MatListModule, MatCardModule } from '@angular/material';
import { AuthService, Profile } from '../core/services/auth.service';
import { of } from 'rxjs';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let PROFILE: Profile;
  let mockAuthService;

  beforeEach(async(() => {
    PROFILE = {
      avatar: "https://gravatar.com/avatar/5985c7230839f53ead828b47b6f01c32?s=200&d=retro",
      profile: {
        gender: undefined,
        location: undefined,
        name: "username",
        picture: undefined,
        website: undefined
      }
    }
    mockAuthService = jasmine.createSpyObj(['getAllUsers'])
    mockAuthService.getAllUsers.and.returnValue(of([PROFILE]))
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [MatCardModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
