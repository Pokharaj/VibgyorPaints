import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { USER } from 'src/app/shared/constants';
import { UserState, getLoggedInUser } from '../state/reducers/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanLoad {

  constructor(private store: Store<UserState>, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.pipe(select(getLoggedInUser)).pipe(map((user) => {
      if (user && user.role.role === USER.ADMIN) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }),
    first());
  }
}
