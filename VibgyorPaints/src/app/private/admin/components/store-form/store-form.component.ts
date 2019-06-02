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
  // cities;
  constructor(
    private fb: FormBuilder,
    private storeService: StoresService,
    public dialogRef: MatDialogRef<StoreFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.store = data.store;
    // this.cities = data.cities;
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
        city: [{value: this.store.city.name, disabled: true}, Validators.required],
        storeName: [this.store.storeName, Validators.required],
        address: [this.store.address, Validators.required],
        active: [!this.store.deleted]
      });
    }
  }

  save(): void {
    if (this.store === null) {
      this.storeService.create(this.createStoreObject(this.storeForm.value)).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.storeService.update(this.createStoreObject(this.storeForm.value)).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  createStoreObject(value) {
    const store: Store = {
      id: this.store != null ? this.store.id : null,
      city: {
        id: this.store != null ? this.store.city.id : null,
        name: value.city
      },
      address: value.address,
      storeName: value.storeName,
      deleted: !value.active
    };
    return store;
  }
}
