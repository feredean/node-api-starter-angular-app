import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'nasa-sidenav-content',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Output() closeSidenav = new EventEmitter<void>()

  constructor() { }
}
