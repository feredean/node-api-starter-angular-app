import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { EnsureModuleLoadedOnceGuard } from './guards/ensure-module-loaded-once.guard';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';


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

@NgModule({
  declarations: [AppLayoutComponent, SidenavComponent, ToolbarComponent],
  imports: [RouterModule, SharedModule, HttpClientModule, JwtModule.forRoot(JWTModuleOptions)],
  exports: [AppLayoutComponent, SidenavComponent, ToolbarComponent],
  providers: [AuthService]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
