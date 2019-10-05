import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../services/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'nasa-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() isHandset$: Observable<boolean>;
  @Input() profile$: Observable<Profile>;
  @Output() toggleSidenav = new EventEmitter<void>();

  avatar: string;
  name: string;

  constructor() { }

  ngOnInit() {
    this.profile$.subscribe(
      (data: Profile) => {
        const name = _.get(data, 'profile.name');
        this.name = name ? name : 'Profile';
        this.avatar = data.avatar;
      }
    );
  }
}
