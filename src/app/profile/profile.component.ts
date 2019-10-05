import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';

import { ServerErrors } from '../core/models/error-message';
import { AuthService, Profile } from '../core/services/auth.service';
import { PasswordChangeRequest } from '../core/services/auth.model';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'nasa-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  passwordForm: FormGroup;
  serverErrors: ServerErrors;

  profileSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: '',
      location: '',
      website: ''
    });
    this.profileSubscription = this.authService.profileChange$.subscribe(
      (data: Profile) => {
        if (!data.profile) { return; }
        this.profileForm.patchValue({
          name: data.profile.name,
          location: data.profile.location,
          website: data.profile.website
        });
      }
    );
  }

  submitProfile(form: FormGroup) {
    this.authService.updateProfile(form.value)
      .subscribe(
        () => this.snackBar.open('Profile updated', 'Got it!', { duration: 3000 })
      );
  }

  submitPassword(data: PasswordChangeRequest) {
    this.serverErrors = undefined;
    this.authService.changePassword(data)
      .subscribe(
        () => this.snackBar.open('Password changed', 'Got it!', { duration: 3000 }),
        (err: ServerErrors) => this.serverErrors = err
      );
  }

  deleteProfile(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '350px',
      data: {
        message: 'Are you sure you want to delete your account?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.deleteAccount()
          .subscribe(
            () => {
              this.snackBar.open('Account successfully deleted', 'Got it!', { duration: 3000 });
              this.authService.logout();
              this.router.navigate(['/login']);
            }
          );
      }
    });
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
  }
}
