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
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {

  feedbacks: Feedback[];
  sub: Subscription;
  loading = true;
  isLoggedIn = false;
  comment: FormControl;
  user: User;
  isAdmin = true;

  constructor(private feedbackService: FeedbackService,
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
        this.user = user;
        if (user.role.role === USER.ADMIN) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      } else {
        this.isLoggedIn = false;
      }
    });
    this.loadData();
  }

  loadData() {
    this.feedbacks = [];
    this.sub = this.feedbackService.getFeedbacks().subscribe((feedbacks: Feedback[]) => {
      this.feedbacks = feedbacks;
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

  postFeedback() {
    if (!this.comment.invalid) {
      const feedback: Feedback = {
        id: null,
        user: this.user,
        date: new Date(),
        comment: this.comment.value
      };
      this.feedbackService.create(feedback).subscribe(() => {
        this.snackbar.openSnackBar('Feedback Saved', 'Close', 2000);
        this.comment = new FormControl();
        this.loadData();
      });
    }
  }
}
