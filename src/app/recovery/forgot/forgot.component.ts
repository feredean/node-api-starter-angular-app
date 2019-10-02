import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ServerErrors } from 'src/app/core/models/error-message';

type Errors = {
  email: string;
}

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;
  serverErrors: ServerErrors;
  error: Errors = {
    email: ''
  }

  private validationMessages = {
    email: {
      required: 'email address is required',
      email: 'email address has to be valid'
    }
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
    })
    const emailControl = this.forgotForm.get('email')
    emailControl.valueChanges.subscribe(() => this.notify(emailControl, 'email'))
  }

  onSubmit(form: FormGroup) {
    this.authService.forgotPassword(form.value)
      .subscribe(
        () => this.snackBar.open('An email has been sent', 'Got it!', { duration: 3000 }),
        (err: ServerErrors) => this.serverErrors = err
      )
  }

  notify(c: AbstractControl, field: string): void {
    this.error[field] = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.error[field] = Object.keys(c.errors)
        .map(key => this.validationMessages[field][key]);
    }
  }
}
