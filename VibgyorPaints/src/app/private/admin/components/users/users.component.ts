import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatPaginator, MatTabChangeEvent, MatTableDataSource } from '@angular/material';
import { User } from 'src/app/core/models/user';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { UserService } from 'src/app/core/services/user.service';
import { UserRequestDetailsComponent } from '../user-request-details/user-request-details.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedUserColumns: string[] = ['name', 'email', 'location', 'deleted'];
  displayedUserRequestColumns: string[] = [
    'name', 'email', 'location',
    'details', 'accept', 'reject'
  ];
  usersDataSource: MatTableDataSource<User>;
  userRequestDataSource: MatTableDataSource<User>;

  users: User[];
  userKeys: string[];
  userRequestKeys: string[];
  subscriptions: Subscription[];

  constructor(
    private userService: UserService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.loadData();
  }

  /**
   * Call users service and load data
   */
  loadData(): void {
    const sub = this.userService.getData('users').subscribe(data => {
      this.users = [];
      this.userKeys = [];
      this.userRequestKeys = [];

      for (const [key, value] of Object.entries(data.payload.val())) {
        // console.log(value);
        if (value.active || value.isDeleted) {
          this.userKeys.push(key);
        } else {
          this.userRequestKeys.push(key);
        }
        this.users.push(value);
      }
      this.usersDataSource = new MatTableDataSource<User>(
        this.users.filter(
          value => value.active === true || value.isDeleted === true
        )
      );
      this.userRequestDataSource = new MatTableDataSource<User>(
        this.users.filter(
          value => value.active === false && value.isDeleted === false
        )
      );
      this.usersDataSource.paginator = this.paginator;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  /**
   * Change paginator to data source of selected tab
   * @param tabChangeEvent MatTabChangeEvent
   */
  tabChangeEvent(tabChangeEvent: MatTabChangeEvent): void {
    switch (tabChangeEvent.index) {
      case 0:
        this.usersDataSource.paginator = this.paginator;
        break;
      case 1:
        this.userRequestDataSource.paginator = this.paginator;
        break;
    }
  }

  /**
   * Accept user creation request for business customer
   * @param index position of user key
   */
  accept(index: number) {
    const uid = this.userRequestKeys[index];
    this.userService
      .updateUser(uid, { active: true })
      .then(() => console.log('Successful'), () => console.log('Error'));
    this.displayMessage(true);
  }

  /**
   * Reject user creation request for business customer
   * @param index position of user key
   */
  reject(index: number) {
    const uid = this.userRequestKeys[index];
    this.userService
      .updateUser(uid, { isDeleted: true })
      .then(() => console.log('Successful'), () => console.log('Error'));
    this.displayMessage(false);
  }

  /**
   * Display user details
   * @param index position of user key
   */
  displayDetails(index: number) {
    // console.log(index);
    this.openDialog(
      this.userRequestKeys[index],
      this.userRequestDataSource.data[index]
    );
  }

  openDialog(uid: string, user: User): void {
    const dialogRef = this.dialog.open(UserRequestDetailsComponent, {
      width: '350px',
      data: { uid, user }
    });

    const sub = dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
      this.displayMessage(result);
    });
    this.subscriptions.push(sub);
  }

  acceptClick(index: number): void {
    const data = {message: 'Are you sure you want to accept the request', comment: false};
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data
    });

    const sub = dialogRef.afterClosed().subscribe(result => {
      if (result.yesclicked) {
        this.accept(index);
      }
    });
    this.subscriptions.push(sub);
  }

  rejectClick(index: number): void {
    const data = {message: 'Are you sure you want to reject the request', comment: false};
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data
    });

    const sub = dialogRef.afterClosed().subscribe(result => {
      if (result.yesclicked) {
        this.reject(index);
      }
    });
    this.subscriptions.push(sub);
  }

  displayMessage(result): void {
    switch (result) {
      case null:
        break;
      case true:
        this.snackbar.openSnackBar('Request Accepted', 'Close', 2000);
        break;
      case false:
        this.snackbar.openSnackBar('Request Rejected', 'Close', 2000);
        break;
    }
  }
}
