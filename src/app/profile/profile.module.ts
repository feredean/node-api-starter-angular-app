import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProfileRoutingModule.components],
  imports: [ProfileRoutingModule, SharedModule]
})
export class ProfileModule { }
