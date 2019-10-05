import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { ServerErrors } from '../core/models/error-message';
import { Router } from '@angular/router';

enum Fields {
  EMAIL = 'email',
  PASSWORD = 'password',
  NAME = 'name'
}
type Errors = {
  [key in Fields]: string;
};

@Component({
  selector: 'nasa-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  serverErrors: ServerErrors;
  error: Errors = {
    email: '',
    password: '',
    name: ''
  };


  private validationMessages = {
    email: {
      required: 'email address is required',
      email: 'email address has to be valid'
    },
    password: {
      required: 'password is required',
      minlength: 'password min length is 8 chars'
    },
    name: {
      maxlength: 'name max length is 30 chars'
    }
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        password: ['', [
          Validators.required,
          Validators.minLength(8)
        ]],
        name: ['', Validators.maxLength(30)]
      });

    const emailControl = this.registerForm.get('email');
    emailControl.valueChanges.subscribe(() => this.notify(emailControl, Fields.EMAIL));

    const passwordControl = this.registerForm.get('password');
    passwordControl.valueChanges.subscribe(() => this.notify(passwordControl, Fields.PASSWORD));

    const nameControl = this.registerForm.get('name');
    nameControl.valueChanges.subscribe(() => this.notify(nameControl, Fields.NAME));
  }

  onSubmit(form: FormGroup) {
    this.serverErrors = undefined;
    this.authService.register(form.value)
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
