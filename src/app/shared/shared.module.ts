import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatSidenavModule, MatIconModule, MatListModule, MatSnackBarModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { UnderlineDirective } from './directives/underline.directive';
import { PasswordFormComponent } from './password-form/password-form.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

const MaterialModules = [MatSidenavModule, MatToolbarModule, MatButtonModule, MatCardModule,
  MatInputModule, MatIconModule, MatListModule, MatFormFieldModule, MatSnackBarModule, MatDialogModule]

@NgModule({
  declarations: [UnderlineDirective, PasswordFormComponent, ConfirmModalComponent],
  imports: [CommonModule, MaterialModules, ReactiveFormsModule, FlexLayoutModule],
  exports: [CommonModule, MaterialModules, ReactiveFormsModule, FlexLayoutModule, UnderlineDirective, PasswordFormComponent, ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent]
})
export class SharedModule { }
