import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ServerErrors } from 'src/app/core/models/error-message';
import { matchPasswords } from '../../shared/validators/password-matcher.validator';
import { MatSnackBar } from '@angular/material';

enum Fields {
  PASSWORD = "password",
  CONFIRM = "confirm"
}

type Errors = {
  [key in Fields]: string;
}

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  resetForm: FormGroup;
  serverErrors: ServerErrors;
  error: Errors = {
    password: '',
    confirm: ''
  }

  private token: string;
  private validationMessages = {
    password: {
      required: 'password is required',
      minlength: 'password min length is 8 chars'
    },
    confirm: {
      required: 'confirm is required',
      minlength: 'confirm min length is 8 chars'
    }
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => this.token = params.token
    )

    this.resetForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
      confirm: ['', [
        Validators.required,
        Validators.minLength(8)]]
    }, { asyncValidators: matchPasswords.bind(this) })

    const passwordControl = this.resetForm.get('password')
    passwordControl.valueChanges.subscribe(() => this.notify(passwordControl, Fields.PASSWORD))

    const confirmControl = this.resetForm.get('confirm')
    confirmControl.valueChanges.subscribe(() => this.notify(confirmControl, Fields.CONFIRM))
  }

  onSubmit(form: FormGroup) {
    // this.authService.updateProfile(form.value)
    //   .subscribe(
    //     () => this.snackBar.open('Password updated', 'Got it!', { duration: 3000 }),
    //     (err: ServerErrors) => this.serverErrors = err
    //   )
  }

  private notify(c: AbstractControl, field: string): void {
    this.error[field] = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.error[field] = Object.keys(c.errors)
        .map(key => this.validationMessages[field][key]);
    }
  }
}
