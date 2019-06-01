import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresComponent } from './stores.component';
import { of } from 'rxjs';

describe('StoresComponent-Admin', () => {
  let component: StoresComponent;
  let mockStoreService;
  let mockSnackbarService;
  let mockMatDialog;

  beforeEach(() => {
    mockStoreService = jasmine.createSpyObj(['getStores', 'updateStore', 'saveNewStore', 'saveNewCityStore']);
  });

  it('should call getStores', () => {
    mockStoreService.getStores.and.returnValue(of(null));

    component = new StoresComponent(mockStoreService, mockSnackbarService, mockMatDialog);
    component.ngOnInit();

    expect(mockStoreService.getStores).toHaveBeenCalled();
  });
});
