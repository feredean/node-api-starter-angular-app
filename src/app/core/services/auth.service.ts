import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { of, throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ErrorMessage } from '../models/error-message';
import { LoginData, RegisterData } from '../models/data';

interface TokenResponse {
  token: string
}

export interface Profile {
  email: string;
  role: string;
  sub: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null;
  profile: Profile;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  isAuthenticated() {
    return this.verifyToken();
  }

  login(login: LoginData): Observable<boolean> {
    return this.http.post<TokenResponse>(`${environment.API}/account/login`, login)
      .pipe(
        map(res => this.handleToken(res)),
        catchError(this.handleError)
      )
  }

  register(registration: RegisterData): Observable<boolean> {
    return this.http.post<TokenResponse>(`${environment.API}/account/register`, registration)
      .pipe(
        map(res => this.handleToken(res)),
        catchError(this.handleError)
      )
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  refreshToken(): Observable<Response | boolean> {
    if (!this.verifyToken()) return of(false)
    return this.http.get<TokenResponse>(`${environment.API}/account/jwt/refresh`)
      .pipe(
        map(res => this.handleToken(res)),
        catchError(this.handleError)
      )
  }

  private verifyToken(): boolean {
    const token = localStorage.getItem('token');
    if (token != null && !this.jwtHelper.isTokenExpired(token)) {
      this.token = token
      return true
    } else {
      localStorage.removeItem('token');
      this.token = null
    }
  }

  private handleToken(res: TokenResponse): boolean {
    if (res.token) {
      this.token = res.token;
      this.profile = this.jwtHelper.decodeToken(this.token)
      localStorage.setItem('token', res.token)
      return true
    } else {
      return false
    }
  }

  private handleError(err: Response | any) {
    let errMessage: ErrorMessage;
    if (err instanceof HttpErrorResponse) {
      errMessage = { status: err.status, message: err.error }
    } else {
      errMessage = {
        status: err.status,
        message: err.message ? err.message : err.toString()
      }
    }
    return throwError(errMessage)
  }
}
