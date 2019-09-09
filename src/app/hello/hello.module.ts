import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloRoutingModule } from './hello-routing.module';


@NgModule({
  declarations: [HelloRoutingModule.components],
  imports: [CommonModule, HelloRoutingModule]
})
export class HelloModule { }
