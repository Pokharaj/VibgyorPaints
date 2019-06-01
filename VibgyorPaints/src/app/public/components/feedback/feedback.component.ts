import { Component, OnDestroy, OnInit } from '@angular/core';
import { Feedback } from 'src/app/core/models/feedback';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { getLoggedInUser, UserState } from 'src/app/core/state/reducers/user.reducer';
import { select, Store } from '@ngrx/store';
import { USER } from 'src/app/shared/constants';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {

  feedbacklist: Feedback[];
  sub: Subscription;
  loading = true;
  isLoggedIn = false;
  comment: FormControl;
  isNotAdmin = true;
  username = '';

  constructor(private feedbackservice: FeedbackService,
              private datepipe: DatePipe,
              private dialog: MatDialog,
              private store: Store<UserState>,
              private snackbar: SnackbarService) {
    this.comment = new FormControl('', [Validators.required]);
  }

  ngOnInit() {
    this.sub = this.store.pipe(select(getLoggedInUser)).subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.username = user.firstname + ' ' + user.lastname;
        if (user.role.role === USER.admin) {
          this.isNotAdmin = false;
        }
      } else {
        this.isLoggedIn = false;
      }
    });

    this.sub = this.feedbackservice.getFeedback().subscribe(res => {
      this.feedbacklist = [];
      for (const [key, value] of Object.entries(res.payload.val())) {
        this.feedbacklist.push({
          key,
          id: value.id,
          name: value.name,
          date: new Date(value.date),
          comment: value.comment
        });
      }
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getDurationString(date: Date) {
    return this.datepipe.transform(date, 'dd MMM, yyyy');
  }

  login(): void {
    this.dialog.open(LoginComponent, {
      width: '500px',
      height: '500px'
    });
  }

  addComment() {
    if (!this.comment.invalid) {
      const feedback = {
        id: this.feedbacklist.length,
        name: this.username,
        date: new Date().toDateString(),
        comment: this.comment.value
      };
      this.feedbackservice.saveFeedback(feedback).then(() => {
        this.snackbar.openSnackBar('Feedback Saved', 'Close', 2000);
        this.comment = new FormControl();
      }).catch(err => {
        console.log(err);
      });
    }
  }
}
