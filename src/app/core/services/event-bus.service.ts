import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

export enum Events {
  ViewPortChange
}

@Injectable()
export class EventBusService {

  private subject$ = new Subject<any>();

  on(event: Events, action: any): Subscription {
    return this.subject$
      .pipe(
        filter((e: EmitEvent) => {
          return e.name === event;
        }),
        map((e: EmitEvent) => {
          return e.value;
        })
      )
      .subscribe(action);
  }

  emit(event: EmitEvent) {
    this.subject$.next(event)
  }
}

export class EmitEvent {
  constructor(public name: any, public value?: any) { }
}