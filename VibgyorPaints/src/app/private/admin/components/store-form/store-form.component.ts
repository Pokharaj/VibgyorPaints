import { Component, OnInit, Inject } from '@angular/core';
import { StoresService } from 'src/app/core/services/stores.service';
import { Store } from 'src/app/core/models/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {
  store: Store;
  storeForm: FormGroup;
  cities;
  constructor(
    private fb: FormBuilder,
    private storeService: StoresService,
    public dialogRef: MatDialogRef<StoreFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.store = data.store;
    this.cities = data.cities;
  }

  ngOnInit() {
    if (this.store === null || this.store === undefined) {
      this.storeForm = this.fb.group({
        city: ['', Validators.required],
        storeName: ['', Validators.required],
        address: ['', Validators.required],
        active: true
      });
    } else {
      this.storeForm = this.fb.group({
        city: [{value: this.store.city, disabled: true}, Validators.required],
        storeName: [this.store.storeName, Validators.required],
        address: [this.store.address, Validators.required],
        active: [!this.store.deleted]
      });
    }
  }

  save(): void {
    if (this.store !== null) {
      this.storeService.updateStore(
        this.store.city + '/' + this.store.index,
        this.createUpdateObject(this.storeForm.value)
      );
    } else {
      if (!this.cities.includes(this.storeForm.value.city)) {
        this.storeService.saveNewCityStore(
          this.storeForm.value.city,
          this.createUpdateObject(this.storeForm.value)
        );
      } else {
        this.storeService.saveNewStore(
          this.storeForm.value.city,
          this.createUpdateObject(this.storeForm.value)
        );
      }
    }
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  createUpdateObject(value) {
    return {
      address: value.address,
      name: value.storeName,
      deleted: !value.active
    };
  }
}
