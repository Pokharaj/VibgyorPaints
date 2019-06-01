import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { UserState } from './core/state/reducers/user.reducer';
import { SetLoggedInUser } from './core/state/user.action';

@Injectable()
export class AppInitService {

  constructor(private cookie: CookieService, private store: Store<UserState>) { }

  Init() {
    return new Promise<void>((resolve, reject) => {
      if (Object.keys(this.cookie.get('loggedInUser')).length > 0) {
        this.store.dispatch(new SetLoggedInUser(JSON.parse(localStorage.getItem(this.cookie.get('loggedInUser')))));
      }
      resolve();
    });
  }
}
