import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresComponent } from './stores.component';
import { of } from 'rxjs';
import { Store } from 'src/app/core/models/store';
import { MatTableDataSource } from '@angular/material';

describe('StoresComponent', () => {
  let component: StoresComponent;
  let STORES: Store[];
  let mockStoreService;

  beforeEach(() => {

    STORES = [
      { city: 'Bangalore', index: '0', storeName: 'Storename1', address: 'Address1', deleted: false },
      { city: 'Bangalore', index: '1', storeName: 'Storename2', address: 'Address2', deleted: false },
      { city: 'Bangalore', index: '2', storeName: 'Storename3', address: 'Address3', deleted: false }
    ];

    mockStoreService = jasmine.createSpyObj(['getStores']);
  });

  it('should hava given data source', () => {
    mockStoreService.getStores.and.returnValue(of(null));

    component = new StoresComponent(mockStoreService);
    component.storesDataSource = new MatTableDataSource(STORES);

    expect(component.storesDataSource.data).toBe(STORES);
  });
});
