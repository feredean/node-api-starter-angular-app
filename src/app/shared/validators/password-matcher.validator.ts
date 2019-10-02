import { AbstractControl } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export function matchPasswords(c: AbstractControl): Observable<{ [key: string]: boolean } | null> {
  return timer(300).pipe(
    map(() => {
      const passwordControl = c.get('password');
      const confirmControl = c.get('confirm');
      if (passwordControl.pristine || confirmControl.pristine) return null;
      if (passwordControl.value === confirmControl.value) return null;
      return { match: true }
    })
  )
}
