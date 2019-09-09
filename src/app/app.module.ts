import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, CoreModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
