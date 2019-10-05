import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutComponent } from './app-layout.component';
import { MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule } from '@angular/material';
import { AuthService, JWTPayload, Profile } from '../services/auth.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;
  let mockAuthService;
  let PROFILE: Profile;
  let JWT_PAYLOAD: JWTPayload;

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

    JWT_PAYLOAD = {
      email: 'email@gmail.com',
      exp: 1570800077,
      role: 'admin',
      sub: 'b62cef8a-7b74-4002-9022-1431b14b1ca6'
    };

    mockAuthService = jasmine.createSpyObj(['logout']);
    mockAuthService.profileChange$ = of(PROFILE);
    mockAuthService.payloadUpdate$ = of(JWT_PAYLOAD);

    TestBed.configureTestingModule({
      declarations: [AppLayoutComponent, SidenavComponent, ToolbarComponent],
      imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, RouterTestingModule, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
