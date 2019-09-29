import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { ServerErrors } from '../core/models/error-message';
import { Router } from '@angular/router';

enum Fields {
  EMAIL = "email",
  PASSWORD = "password"
}
type Errors = {
  [key in Fields]: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
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
      required: 'password is required',
      minlength: 'password min length is 8 chars'

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
        name: ''
      });

    const emailControl = this.registerForm.get('email')
    const passwordControl = this.registerForm.get('password')

    emailControl.valueChanges.subscribe(() => this.notify(emailControl, Fields.EMAIL))
    passwordControl.valueChanges.subscribe(() => this.notify(passwordControl, Fields.PASSWORD))
  }

  onSubmit(form: FormGroup) {
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
