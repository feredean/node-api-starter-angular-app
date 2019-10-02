import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { ServerErrors } from '../core/models/error-message';
import { AuthService, Profile } from '../core/services/auth.service';
import { matchPasswords } from '../shared/validators/password-matcher.validator';

enum Fields {
  PASSWORD = "password",
  CONFIRM = "confirm"
}

type Errors = {
  [key in Fields]: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  passwordForm: FormGroup;
  serverErrors: ServerErrors;
  error: Errors = {
    password: '',
    confirm: ''
  }

  profileSubscription: Subscription;

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
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: '',
      location: '',
      website: ''
    })
    this.profileSubscription = this.authService.profileChange$.subscribe(
      (data: Profile) => {
        if (!data.profile) return
        this.profileForm.patchValue({
          name: data.profile.name,
          location: data.profile.location,
          website: data.profile.website
        })
      }
    )
    this.passwordForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
      confirm: ['', [
        Validators.required,
        Validators.minLength(8)]]
    }, { asyncValidators: matchPasswords.bind(this) })

    const passwordControl = this.passwordForm.get('password')
    passwordControl.valueChanges.subscribe(() => this.notify(passwordControl, Fields.PASSWORD))

    const confirmControl = this.passwordForm.get('confirm')
    confirmControl.valueChanges.subscribe(() => this.notify(confirmControl, Fields.CONFIRM))
  }

  submitProfile(form: FormGroup) {
    this.authService.updateProfile(form.value)
      .subscribe(
        () => this.snackBar.open('Profile updated', 'Got it!', { duration: 3000 }),
        (err: ServerErrors) => this.serverErrors = err
      )
  }

  submitPassword(form: FormGroup) {
    this.authService.changePassword(form.value)
      .subscribe(
        () => this.snackBar.open('Password changed', 'Got it!', { duration: 3000 }),
        (err: ServerErrors) => this.serverErrors = err
      )
  }

  private notify(c: AbstractControl, field: string): void {
    this.error[field] = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.error[field] = Object.keys(c.errors)
        .map(key => this.validationMessages[field][key]);
    }
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
  }
}
