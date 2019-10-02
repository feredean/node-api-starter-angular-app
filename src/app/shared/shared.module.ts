import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatSidenavModule, MatIconModule, MatListModule, MatSnackBarModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { UnderlineDirective } from './directives/underline.directive';

const MaterialModules = [MatSidenavModule, MatToolbarModule, MatButtonModule, MatCardModule,
  MatInputModule, MatIconModule, MatListModule, MatFormFieldModule, MatSnackBarModule]

@NgModule({
  declarations: [UnderlineDirective],
  imports: [CommonModule, MaterialModules, ReactiveFormsModule, FlexLayoutModule],
  exports: [CommonModule, MaterialModules, ReactiveFormsModule, FlexLayoutModule, UnderlineDirective]
})
export class SharedModule { }
