import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';
import { ServerErrors } from 'src/app/core/models/error-message';
import { PasswordChangeRequest } from 'src/app/core/services/auth.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'nasa-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  processingReset = false;
  serverErrors: ServerErrors;

  private token: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => this.token = params.token
    );
  }

  onSubmit(data: PasswordChangeRequest) {
    this.serverErrors = undefined;
    this.processingReset = true;
    this.authService.resetPassword(data, this.token)
      .pipe(finalize(() => this.processingReset = false))
      .subscribe(
        () => {
          this.snackBar.open('Password updated', 'Got it!', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        (err: ServerErrors) => this.serverErrors = err
      );
  }
}
