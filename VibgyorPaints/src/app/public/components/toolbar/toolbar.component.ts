import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { UserState, getLoggedInUser } from 'src/app/core/state/reducers/user.reducer';
import { UserService } from 'src/app/core/services/user.service';
import { ClearLoggedInUser } from 'src/app/core/state/user.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  greeting = 'Login';
  userloggedIn = false;
  subscriptions: Subscription[];
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private dialog: MatDialog,
              private store: Store<UserState>,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.subscriptions = [];
    const sub = this.store.pipe(select(getLoggedInUser)).subscribe(user => {
      if (user) {
        this.greeting = user.firstname;
        this.userloggedIn = true;
      } else {
        this.greeting = 'Login';
        this.userloggedIn = false;
      }
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  openLoginDialog() {
    const dialogref = this.dialog.open(LoginComponent, {
      width: '500px',
      height: '500px'
    });

    const sub = dialogref.afterClosed().subscribe(name => {
      // if (name !== null && name !== undefined) {
      //   this.greeting = name;
      //   this.userloggedIn = true;
      // }
    });
    this.subscriptions.push(sub);
  }

  logout() {
    this.userService.deleteCache();
    this.store.dispatch(new ClearLoggedInUser());
    this.router.navigate(['/home']);
  }

}
