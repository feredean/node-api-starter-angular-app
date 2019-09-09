import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { EnsureModuleLoadedOnceGuard } from './guards/ensure-module-loaded-once.guard';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';

@NgModule({
  declarations: [AppLayoutComponent, SidenavComponent, ToolbarComponent],
  imports: [RouterModule, SharedModule, HttpClientModule],
  exports: [AppLayoutComponent, SidenavComponent, ToolbarComponent]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
