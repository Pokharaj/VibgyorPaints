import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { slideInAnimation } from 'src/app/app.animation';
import { getLoggedInUser, UserState } from 'src/app/core/state/reducers/user.reducer';
import { USER } from 'src/app/shared/constants';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [slideInAnimation]
})
export class SidenavComponent implements OnInit {

  isDarkTheme = false;
  mediaMatcher: MediaQueryList;
  adminuser = false;
  loggedIn = false;
  users: Observable<any[]>;
  showThemes = true;
  loading = true;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(private router: Router, private store: Store<UserState>) {

    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
        this.sidenav.close();
    });
    // TODO: Unsubscribe
    this.store.pipe(select(getLoggedInUser)).subscribe((user) => {
      if (user) {
        this.loggedIn = true;
        this.adminuser = user.type === USER.admin;
        this.showThemes = user.type !== USER.B2B;
      } else {
        this.loggedIn = false;
        this.adminuser = false;
      }
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }
}
