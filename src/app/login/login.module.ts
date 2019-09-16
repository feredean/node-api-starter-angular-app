import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginRoutingModule.components],
  imports: [LoginRoutingModule, SharedModule]
})
export class LoginModule { }
