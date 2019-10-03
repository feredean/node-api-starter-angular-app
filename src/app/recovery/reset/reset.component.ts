import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';

import { MatSnackBar } from '@angular/material';
import { ServerErrors } from 'src/app/core/models/error-message';
import { PasswordChangeRequest } from 'src/app/core/services/auth.model';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  private token: string;
  serverErrors: ServerErrors;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => this.token = params.token
    )
  }

  onSubmit(data: PasswordChangeRequest) {
    this.serverErrors = undefined;
    this.authService.resetPassword(data, this.token)
      .subscribe(
        () => this.snackBar.open('Password updated', 'Got it!', { duration: 3000 }),
        (err: ServerErrors) => this.serverErrors = err
      )
  }
}
