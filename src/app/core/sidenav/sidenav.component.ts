import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { JWTPayload } from '../services/auth.service';

@Component({
  selector: 'nasa-sidenav-content',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @Input() JWTPayload$: Observable<JWTPayload>;
  @Output() closeSidenav = new EventEmitter<void>()
  @Output() logout = new EventEmitter<void>()

  constructor() { }
}
