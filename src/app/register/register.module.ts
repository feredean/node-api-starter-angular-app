import { NgModule } from '@angular/core';

import { RegisterRoutingModule } from './register-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [RegisterRoutingModule.components],
  imports: [RegisterRoutingModule, SharedModule]
})
export class RegisterModule { }
