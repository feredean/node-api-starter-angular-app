import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

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
