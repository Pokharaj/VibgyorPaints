import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/core/models/user';
import { Visit } from 'src/app/core/models/visit';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { VisitService } from 'src/app/core/services/visit.service';
import { UserState, getLoggedInUser } from 'src/app/core/state/reducers/user.reducer';
import { USER } from '../../constants';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { VisitFormComponent } from './visit-form.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent  implements OnInit, OnDestroy {

  isAdmin = false;
  user: User;
  displayedColumns: string[];
  visitsData: Visit[];
  visitsDataSource: MatTableDataSource<Visit>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  subscriptions: Subscription[];

  constructor(
    private visitsService: VisitService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private store: Store<UserState>
    ) {
      this.subscriptions = [];
      const sub = this.store.pipe(select(getLoggedInUser)).subscribe((user: User) => {
        if (user) {
          this.user = user;
          this.isAdmin = this.user.role.role === USER.ADMIN;
        } else {
          this.isAdmin = false;
        }
      });
      this.subscriptions.push(sub);
    }

  ngOnInit() {
    if (this.isAdmin) {
      this.displayedColumns = ['userEmail', 'visitDate', 'requestDate', 'description', 'status', 'reject', 'more'];
    } else {
    this.displayedColumns = ['visitDate', 'requestDate', 'description', 'status', 'edit', 'more'];
    }
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  loadData(): void {
    this.visitsData = [];
    const sub = this.getVisitData().subscribe((visits: Visit[]) => {
      this.visitsData = visits;
      this.visitsDataSource = new MatTableDataSource<Visit>(this.visitsData);
      this.visitsDataSource.paginator = this.paginator;
      // this.visitsDataSource.sort = this.sort;
    });
    this.subscriptions.push(sub);
  }

  getVisitData() {
    if(this.isAdmin) {
      return this.visitsService.getvisits();
    } else {
      return this.visitsService.findByUser(this.user.id);
    }
  }

  applyFilter(filterValue: string) {
    this.visitsDataSource.filter = filterValue.trim().toLowerCase();
    this.visitsDataSource.paginator.firstPage();
  }

  add(): void {
    this.openDialog({data: null, viewOnly: false, isAdmin: this.isAdmin});
  }

  edit(visit: Visit): void {
    this.openDialog({data: visit, viewOnly: false, isAdmin: this.isAdmin});
  }

  reject(visit: Visit): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {message: 'Are you sure you want to reject the visit request ?', comment: true}
    });

    const sub = dialogRef.afterClosed().subscribe(result => {
      if (result.yesclicked) {
        visit.rejected = true;
        visit.comment = result.comment;
        this.visitsService.update(visit).subscribe(() => {
          this.snackbar.openSnackBar('Request Rejected', 'Close', 2000)
          this.loadData();
        });
      }
    });
    this.subscriptions.push(sub);
  }
  moreDetails(visit: Visit): void {
    this.openDialog({data: visit, viewOnly: true, isAdmin: this.isAdmin});
  }

  cancel(visit: Visit): void {
    visit.canceled = true;
    this.visitsService.update(visit).subscribe(() => {
      this.snackbar.openSnackBar('Visit Canceled', 'Close', 2000);
      this.loadData();
    });
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(VisitFormComponent, {
      width: '400px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
      this.loadData();
    });
  }
}
