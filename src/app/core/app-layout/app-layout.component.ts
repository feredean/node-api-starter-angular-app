import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { AuthService, Profile, JWTPayload } from '../services/auth.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))
  profile$: Observable<Profile> = this.authService.profileChange$
  JWTPayload$: Observable<JWTPayload> = this.authService.payloadUpdate$

  closeIfHandset() {
    this.isHandset$.subscribe(value => {
      if (value) this.sidenav.close()
    })
  }

  logout() {
    this.authService.logout();
  }
}
