import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatSidenavModule, MatIconModule, MatListModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

const MaterialModules = [MatSidenavModule, MatToolbarModule, MatButtonModule, MatCardModule,
  MatInputModule, MatIconModule, MatListModule, MatFormFieldModule]

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModules, ReactiveFormsModule, FlexLayoutModule],
  exports: [CommonModule, MaterialModules, ReactiveFormsModule, FlexLayoutModule]
})
export class SharedModule { }
