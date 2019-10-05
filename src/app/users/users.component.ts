import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'nasa-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAllUsers().subscribe(d => this.users = d.data);
  }

}
