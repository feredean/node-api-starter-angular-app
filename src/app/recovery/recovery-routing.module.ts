import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset/:token', component: ResetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RecoveryRoutingModule {
  static components = [ForgotComponent, ResetComponent];
}
