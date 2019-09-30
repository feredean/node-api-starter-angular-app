import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { of, throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ErrorMessage } from '../models/error-message';
import { LoginData, RegisterData, ProfileData, PasswordChangeData, SuccessResponse } from '../models/data';

interface TokenResponse {
  token: string
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

  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null;
  JWTPayload: JWTPayload;
  private profile$ = new BehaviorSubject<Profile>({} as Profile)
  profileChange$ = this.profile$.asObservable()

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

  changePassword(passwordData: PasswordChangeData): Observable<boolean> {
    return this.http.post<SuccessResponse>(`${environment.API}/account/password`, passwordData)
      .pipe(
        map((res: SuccessResponse) => {
          if (res.success) return true
          return false
        }),
        catchError(this.handleError)
      )
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  refreshToken(): Observable<Response | boolean> {
    this.refreshProfile();
    if (!this.verifyToken()) return of(false)
    return this.http.get<TokenResponse>(`${environment.API}/account/jwt/refresh`)
      .pipe(
        map(res => this.handleToken(res)),
        catchError(this.handleError)
      )
  }

  updateProfile(profile: ProfileData): Observable<Response | Profile> {
    return this.http.post<Profile>(`${environment.API}/account/profile`, profile)
      .pipe(
        tap((res: Profile) => this.profile$.next(this.mapProfile(res)))
      )
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
    }
  }

  private refreshProfile(): void {
    this.http.get<Profile>(`${environment.API}/account/profile`)
      .pipe(
        map((res): Profile => (this.mapProfile(res)))
      ).subscribe(res => this.profile$.next(res))
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
      this.JWTPayload = this.jwtHelper.decodeToken(this.token)
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
