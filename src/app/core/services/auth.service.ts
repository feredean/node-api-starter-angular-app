import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { of, throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ServerErrors } from '../models/error-message';
import { LoginRequest, RegisterRequest, ProfileRequest, PasswordChangeRequest, SuccessResponse, ForgotRequest } from './auth.model';

interface TokenResponse {
  token: string;
}

export interface JWTPayload {
  email: string;
  role: string;
  sub: string;
  exp: number;
}

export interface Profile {
  avatar: string;
  profile: {
    name: string;
    gender: string;
    location: string;
    website: string;
    picture: string;

  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null;

  private payload$ = new BehaviorSubject<JWTPayload>({} as JWTPayload);
  payloadUpdate$ = this.payload$.asObservable();
  private profile$ = new BehaviorSubject<Profile>({} as Profile);
  profileChange$ = this.profile$.asObservable();

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  isAuthenticated() {
    return this.verifyToken();
  }

  refreshToken(): Observable<Response | boolean> {
    if (!this.verifyToken()) { return of(false); }
    return this.http.get<TokenResponse>(`${environment.API}/account/jwt/refresh`)
      .pipe(
        map(res => this.handleToken(res)),
        catchError(err => this.handleError(err))
      );
  }

  login(login: LoginRequest): Observable<boolean> {
    return this.http.post<TokenResponse>(`${environment.API}/account/login`, login)
      .pipe(
        map(res => this.handleToken(res)),
        catchError(err => this.handleError(err))
      );
  }

  register(registration: RegisterRequest): Observable<boolean> {
    return this.http.post<TokenResponse>(`${environment.API}/account/register`, registration)
      .pipe(
        map(res => this.handleToken(res)),
        catchError(err => this.handleError(err))
      );
  }

  forgotPassword(email: ForgotRequest): Observable<boolean> {
    return this.http.post<SuccessResponse>(`${environment.API}/account/forgot`, email)
      .pipe(
        map((res: SuccessResponse) => !!res.success),
        catchError(err => this.handleError(err))
      );
  }

  deleteAccount(): Observable<boolean> {
    return this.http.post<SuccessResponse>(`${environment.API}/account/delete`, {})
      .pipe(
        map(res => !!res.success),
        catchError(err => this.handleError(err))
      );
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.API}/users`)
      .pipe(
        tap(w => console.log(w))
      );
  }

  changePassword(passwordData: PasswordChangeRequest): Observable<boolean> {
    return this.http.post<SuccessResponse>(`${environment.API}/account/password`, passwordData)
      .pipe(
        map((res: SuccessResponse) => !!res.success),
        catchError(err => this.handleError(err))
      );
  }

  updateProfile(profile: ProfileRequest): Observable<Response | Profile> {
    return this.http.post<Profile>(`${environment.API}/account/profile`, profile)
      .pipe(
        tap((res: Profile) => this.profile$.next(this.mapProfile(res)))
      );
  }

  resetPassword(data: PasswordChangeRequest, token: string): Observable<boolean> {
    return this.http.post<SuccessResponse>(`${environment.API}/account/reset/${token}`, data)
      .pipe(
        map((res: SuccessResponse) => !!res.success),
        catchError(err => this.handleError(err))
      );
  }

  private mapProfile(res: Profile): Profile {
    return {
      avatar: res.avatar,
      profile: {
        name: res.profile.name,
        gender: res.profile.gender,
        location: res.profile.location,
        website: res.profile.website,
        picture: res.profile.picture
      }
    };
  }

  private refreshProfile(): void {
    if (!this.isAuthenticated()) { return; }
    this.http.get<Profile>(`${environment.API}/account/profile`)
      .pipe(
        map((res): Profile => (this.mapProfile(res)))
      ).subscribe(res => this.profile$.next(res));
  }

  private verifyToken(): boolean {
    const token = localStorage.getItem('token');
    if (token != null && !this.jwtHelper.isTokenExpired(token)) {
      this.token = token;
      return true;
    } else {
      localStorage.removeItem('token');
      this.token = null;
    }
  }

  private handleToken(res: TokenResponse): boolean {
    if (res.token) {
      this.token = res.token;
      this.payload$.next(this.jwtHelper.decodeToken(this.token));
      localStorage.setItem('token', res.token);
      this.refreshProfile();
      return true;
    } else {
      return false;
    }
  }

  private handleError(err: Response | any) {
    if (err.status === 401) {
      this.logout();
    }
    let errMessage: ServerErrors;
    if (err instanceof HttpErrorResponse) {
      errMessage = { status: err.status, message: err.error };
    } else {
      errMessage = {
        status: err.status,
        message: err.message ? err.message : err.toString()
      };
    }
    return throwError(errMessage);
  }
}
