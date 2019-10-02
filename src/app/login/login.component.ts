import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { ServerErrors } from '../core/models/error-message';

enum Fields {
  EMAIL = "email",
  PASSWORD = "password"
}
type Errors = {
  [key in Fields]: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  serverErrors: ServerErrors;
  error: Errors = {
    email: '',
    password: ''
  };


  private validationMessages = {
    email: {
      required: 'email address is required',
      email: 'email address has to be valid'
    },
    password: {
      required: 'password is required'
    }
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]]
    });

    const emailControl = this.loginForm.get('email')
    const passwordControl = this.loginForm.get('password')

    emailControl.valueChanges.subscribe(() => this.notify(emailControl, Fields.EMAIL))
    passwordControl.valueChanges.subscribe(() => this.notify(passwordControl, Fields.PASSWORD))
  }

  onSubmit(form: FormGroup) {
    this.authService.login(form.value)
      .subscribe(
        () => this.router.navigate(['/']),
        (err: ServerErrors) => this.serverErrors = err
      );
  }

  notify(c: AbstractControl, field: string): void {
    this.error[field] = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.error[field] = Object.keys(c.errors)
        .map(key => this.validationMessages[field][key]);
    }
  }
}