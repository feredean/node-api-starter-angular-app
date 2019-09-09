import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'nasa-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input() isHandset$: Observable<boolean>;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor() { }
}
