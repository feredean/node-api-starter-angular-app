import { NgModule } from '@angular/core';

import { ResetComponent } from './reset/reset.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SharedModule } from '../shared/shared.module';
import { RecoveryRoutingModule } from './recovery-routing.module';

@NgModule({
  declarations: [ResetComponent, ForgotComponent],
  imports: [SharedModule, RecoveryRoutingModule]
})
export class RecoveryModule { }
