import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { UserState, getLoggedInUser } from 'src/app/core/state/reducers/user.reducer';
import { UserService } from 'src/app/core/services/user.service';
import { ClearLoggedInUser } from 'src/app/core/state/user.action';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  greeting = 'Login';
  userloggedIn = false;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private dialog: MatDialog,
              private store: Store<UserState>,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    // TODO: Unsubscribe
    this.store.pipe(select(getLoggedInUser)).subscribe(user => {
      if (user) {
        this.greeting = user.firstname;
        this.userloggedIn = true;
      } else {
        this.userloggedIn = false;
      }
    });
  }

  openLoginDialog() {
    const dialogref = this.dialog.open(LoginComponent, {
      width: '500px',
      height: '500px'
    });

    dialogref.afterClosed().subscribe(name => {
      // if (name !== null && name !== undefined) {
      //   this.greeting = name;
      //   this.userloggedIn = true;
      // }
    });
  }

  logout() {
    firebase.auth().signOut()
      .then(() => {
        this.greeting = 'Login';
        this.userloggedIn = false;
        this.userService.deleteCache();
        this.store.dispatch(new ClearLoggedInUser());
        this.router.navigate(['/home']);
      })
      .catch(err => console.log(err));
  }

}
