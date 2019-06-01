import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  comment: string;
  message: string;
  showComments: boolean;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.showComments = data.comment;
      this.message = data.message;
    }

  ngOnInit() {
    this.comment = '';
  }

  onYesClick(): void {
    this.dialogRef.close({yesclicked: true, comment: this.comment});
  }

  onNoClick(): void {
    this.dialogRef.close({yesclicked: false, comment: this.comment});
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '250px',
  //     data: {message: 'value', comment: true} // True if need comment else false
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     const comment = result.comment;
  //     const yes = result.yesclicked;
  //   });
  // }
}
