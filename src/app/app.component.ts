import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { interval, from, timer, of, range, Subscription } from 'rxjs';
import { mergeMap, map, zip, startWith, switchMap, concatMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }
  title = 'node-api-starter-app';

  ngOnInit() {
    this.authService.refreshToken().subscribe({
      error: err => console.log(err)
    })
  }
}
