import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Visit } from 'src/app/core/models/visit';
import { VisitService } from 'src/app/core/services/visit.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';
import { Store, select } from '@ngrx/store';
import { UserState, getLoggedInUser } from 'src/app/core/state/reducers/user.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-visit-form',
  templateUrl: './visit-form.component.html',
  styleUrls: ['./visit-form.component.scss']
})
export class VisitFormComponent implements OnInit, OnDestroy {
  visit: Visit;
  visitForm: FormGroup;
  viewOnly: boolean;
  isAdmin: boolean;
  user: User;
  minSchDate;
  minRchDate;
  maxSchDate;
  maxRchDate;
  subscriptions: Subscription[];

  constructor(
    private fb: FormBuilder,
    private visitService: VisitService,
    private snackbar: SnackbarService,
    private store: Store<UserState>,
    public dialogRef: MatDialogRef<VisitFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.visit = data.data;
    this.viewOnly = data.viewOnly;
    this.isAdmin = data.isAdmin;
    this.subscriptions = [];
    const sub = this.store.pipe(select(getLoggedInUser)).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.subscriptions.push(sub);
  }

  ngOnInit() {
    if (this.isAdmin) {
      this.visitForm = this.fb.group({
        userEmail: { value: this.visit.userEmail, disabled: true },
        schDate: { value: new Date(this.visit.visitDate) , disabled: true },
        rchDate: { value: '', disabled: true },
        description: { value: this.visit.description, disabled: true },
        comment: ['', Validators.required],
      });
    } else if (this.viewOnly) {
      this.visitForm = this.fb.group({
        userEmail: { value: this.visit.userEmail, disabled: true },
        schDate: { value: new Date(this.visit.visitDate) , disabled: true },
        rchDate: { value: '', disabled: true },
        description: { value: this.visit.description, disabled: true },
        comment: { value: this.visit.comment, disabled: true }
      });
    } else if (this.visit === null || this.visit === undefined) {
      this.visitForm = this.fb.group({
        userEmail: '',
        schDate: ['', Validators.required],
        rchDate: '',
        description: ['', Validators.required],
        comment: ''
      });
    } else {
      this.visitForm = this.fb.group({
        userEmail: '',
        schDate: { value: new Date(this.visit.visitDate) , disabled: true },
        rchDate: ['', Validators.required],
        description: [this.visit.description, Validators.required],
        comment: '',
      });
    }
    this.setMinMaxDates();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  save(): void {
    if (this.visit === null) {
      this.visitService.saveNewVisit(this.createNewObject(this.visitForm.value)).then(
        () => this.snackbar.openSnackBar('Visit Scheduled', 'Close', 2000),
        () => console.log('Error')
      );
    } else {
      this.visitService.updateVisit(this.visit.id, this.createUpdateObject(this.visitForm.value)).then(
        () => this.snackbar.openSnackBar('Visit Rescheduled', 'Close', 2000),
        () => console.log('Error')
      );
    }
    this.dialogRef.close(true);
  }

  cancelVisit(): void {
    this.visitService.updateVisit(this.visit.id, {canceled: true}).then(
      () => this.snackbar.openSnackBar('Visit Canceled', 'Close', 2000),
      () => console.log('Error')
    );
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(true);
  }

  reject(): void {
    this.visitService.updateVisit(this.visit.id, {rejected: true, comment: this.visitForm.value.comment}).then(
      () => this.snackbar.openSnackBar('Request Rejected', 'Close', 2000),
      () => console.log('Error')
    );
    this.dialogRef.close(true);
  }

  createNewObject(value) {
    const date = new Date();
    const schDate = new Date(value.schDate);
    return {
      canceled : false,
      userEmail : this.user.emailid,
      rejected : false,
      requestDate : (+date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
      visitDate : (+schDate.getMonth() + 1) + '/' + schDate.getDate() + '/' + schDate.getFullYear(),
      description: value.description,
      comment: ''
    };
  }

  createUpdateObject(value) {
    const date = new Date();
    const rchDate = new Date(value.rchDate);
    return {
      requestDate : (+date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
      visitDate : (+rchDate.getMonth() + 1) + '/' + rchDate.getDate() + '/' + rchDate.getFullYear(),
      description: value.description
    };
  }

  setMinMaxDates(): void {
    let minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    this.minSchDate = minDate;

    minDate = new Date(this.visit.visitDate);
    minDate.setDate(minDate.getDate() + 1);
    this.minRchDate = minDate;
  }
}
