import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { UserState, getLoggedInUser } from '../state/reducers/user.reducer';
import { User } from 'firebase';
import { USER } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<UserState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

      return this.store.pipe(select(getLoggedInUser)).pipe(map((user) => {
      if (user && user.role.role !== USER.admin) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }));
  }
}
