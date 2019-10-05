import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

export function jwtTokenGetter() {
  return localStorage.getItem('token');
}

const JWTModuleOptions = {
  config: {
    tokenGetter: jwtTokenGetter,
    whitelistedDomains:
      ['localhost:9100', 'node-api-starter.experiments.explabs.io']
  }
};

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, JwtModule.forRoot(JWTModuleOptions)],
    providers: [JwtHelperService]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
