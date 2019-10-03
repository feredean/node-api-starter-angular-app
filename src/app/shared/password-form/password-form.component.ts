import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerErrors } from 'src/app/core/models/error-message';

enum Fields {
  PASSWORD = "password",
  CONFIRM = "confirm"
}

type Errors = {
  [key in Fields]: string;
}

@Component({
  selector: 'nasa-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {

  @Input() errors: ServerErrors;
  @Output() onSubmit = new EventEmitter<FormGroup>();

  passwordForm: FormGroup;
  error: Errors = {
    password: '',
    confirm: ''
  }

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
      confirm: ['', [
        Validators.required,
        Validators.minLength(8)]]
    }, { asyncValidators: this.matchPasswords.bind(this) })

    const passwordControl = this.passwordForm.get('password')
    passwordControl.valueChanges.subscribe(() => this.notify(passwordControl, Fields.PASSWORD))

    const confirmControl = this.passwordForm.get('confirm')
    confirmControl.valueChanges.subscribe(() => this.notify(confirmControl, Fields.CONFIRM))
  }

  private notify(c: AbstractControl, field: string): void {
    this.error[field] = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.error[field] = Object.keys(c.errors)
        .map(key => this.validationMessages[field][key]);
    }
  }

  private matchPasswords(c: AbstractControl): Observable<{ [key: string]: boolean } | null> {
    return timer(300).pipe(
      map(() => {
        const passwordControl = c.get('password');
        const confirmControl = c.get('confirm');
        if (passwordControl.pristine || confirmControl.pristine) return null;
        if (passwordControl.value === confirmControl.value) return null;
        return { match: true }
      })
    )
  }
}
