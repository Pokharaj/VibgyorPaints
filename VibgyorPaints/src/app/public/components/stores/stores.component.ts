import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Store } from 'src/app/core/models/store';
import { StoresService } from 'src/app/core/services/stores.service';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['city', 'storeName', 'address'];
  storesDataSource: MatTableDataSource<Store>;
  storesData: Store[];
  cities: string[];
  subscriptions: Subscription[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  search = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(private storesService: StoresService) {
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
    this.storesData = [];
    this.cities = [];
    const sub = this.storesService.getStores().subscribe((stores: Store[]) => {
      this.storesData = stores;
      
      stores.forEach((store: Store) => {
        if(!this.cities.includes(store.city.name)) {
          this.cities.push(store.city.name)
        }
      });

      this.storesDataSource = new MatTableDataSource<Store>(this.storesData);
      this.storesDataSource.paginator = this.paginator;
      this.storesDataSource.sort = this.sort;

      // this.storesDataSource.filterPredicate = (data, filter: string)  => {
      //   const accumulator = (currentTerm, key) => {
      //     return key === 'orderInfo' ? currentTerm + data.city.name : currentTerm + data[key];
      //   };
      //   const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      //   // Transform the filter by converting it to lowercase and removing whitespace.
      //   const transformedFilter = filter.trim().toLowerCase();
      //   return dataStr.indexOf(transformedFilter) !== -1;
      // };
      
      this.initAutoComplete();
    });
    this.subscriptions.push(sub);
  }

  applyFilter(filterValue: string) {
    this.storesDataSource.filter = filterValue.trim().toLowerCase();
    this.storesDataSource.paginator.firstPage();
  }

  initAutoComplete(): void {
    const sub = this.search.valueChanges.subscribe((value: string) => {
      // this.filteredOptions = value ? of(this._filter(value)) : of(this.cities.slice());
      this.filteredOptions = value ? of(this._filter(value)) : of([]);
      this.applyFilter(value);
    });
    this.subscriptions.push(sub);
  }

  displayFn(citi?: string): string | undefined {
    return citi ? citi : undefined;
  }

  private _filter(search: string): string[] {
    const filterValue = search.toLowerCase();

    return this.cities.filter(
      option => option.toLowerCase().indexOf(filterValue) >= 0
    );
  }
}
