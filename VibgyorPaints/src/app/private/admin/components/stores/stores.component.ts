import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Store } from 'src/app/core/models/store';
import { StoresService } from 'src/app/core/services/stores.service';
import { StoreFormComponent } from '../store-form/store-form.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['city', 'storeName', 'address', 'deleted', 'edit'];
  storesDataSource: MatTableDataSource<Store>;
  storesData: Store[];
  cities: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  subscriptions: Subscription[];

  constructor(
    private storesService: StoresService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
    ) {
      this.subscriptions = [];
    }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  loadData(): void {
    const sub = this.storesService.getStores().subscribe((data) => {
      this.storesData = [];
      this.cities = [];
      // console.log(data.payload.val());
      for (const [key, storesArray] of Object.entries(data.payload.val())) {
        this.cities.push(key);
        for (const [ikey, value] of Object.entries(storesArray)) {
          this.storesData.push({
            city: key,
            storeName: value['name'],
            address: value['address'],
            index: ikey,
            deleted: value['deleted']
          });
        }
      }
      this.storesDataSource = new MatTableDataSource<Store>(this.storesData);
      this.storesDataSource.paginator = this.paginator;
      this.storesDataSource.sort = this.sort;
    });
    this.subscriptions.push(sub);
  }

  applyFilter(filterValue: string) {
    this.storesDataSource.filter = filterValue.trim().toLowerCase();
    this.storesDataSource.paginator.firstPage();
  }

  add(): void {
    this.openDialog(null);
  }

  edit(store: Store): void {
    this.openDialog(store);
  }

  openDialog(data: Store): void {
    const dialogRef = this.dialog.open(StoreFormComponent, {
      width: '400px',
      data: { store: data, cities: this.cities }
    });

    const sub = dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadData();
        this.snackbar.openSnackBar('Details Saved', 'Close', 2000);
      }
    });
    this.subscriptions.push(sub);
  }
}
