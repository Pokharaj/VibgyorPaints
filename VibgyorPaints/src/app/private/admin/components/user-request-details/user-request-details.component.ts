import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-request-details',
  templateUrl: './user-request-details.component.html',
  styleUrls: ['./user-request-details.component.scss']
})
export class UserRequestDetailsComponent implements OnInit {

  userDataSource: MatTableDataSource<any>;
  user: any[];
  displayedColumns: string[] = ['key', 'value'];
  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UserRequestDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data) {
  }

  ngOnInit() {
    this.user = [];
    this.user.push({key: 'First Name', value: this.data.user.firstname});
    this.user.push({key: 'Last Name', value: this.data.user.lastname});
    this.user.push({key: 'Email', value: this.data.user.email});
    this.user.push({key: 'Phone', value: this.data.user.phone});
    this.user.push({key: 'Location', value: this.data.user.location});

    this.userDataSource = new MatTableDataSource<any>(this.user);
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }
  /**
   * Accept user creation request for business customer
   */
  accept(): void {
    this.data.user.approved = true;
    this.userService.update(this.data.user).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  /**
   * Reject user creation request for business customer
   */
  reject(): void {
    this.data.user.deleted = true;
    this.userService.update(this.data.user).subscribe(() => {
      this.dialogRef.close(false);
    });
  }
}
