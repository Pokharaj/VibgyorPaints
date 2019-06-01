import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import * as firebase from 'firebase';
import { Products } from 'src/app/core/models/products';
import { UserService } from 'src/app/core/services/user.service';
import { getLoggedInUser, UserState } from 'src/app/core/state/reducers/user.reducer';
import { LoginComponent } from 'src/app/public/components/login/login.component';
import { USER } from 'src/app/shared/constants';
import { EstimatesService } from '../../services/estimates.service';
import { EstimatesDialogComponent } from '../estimates-dialog/estimates-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[];

  constructor(private userservice: UserService,
              private estimates: EstimatesService,
              private store: Store<UserState>,
              private dialog: MatDialog) {
    this.storageRef = firebase.storage().ref();
    this.subscriptions = [];
  }

  productslist: Products[];
  storageRef: firebase.storage.Reference;
  isLoggedIn = false;
  quantities: number[];
  loading = true;

  ngOnInit() {
    this.loadData();
    this.init();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  loadData(): void {
    const sub = this.userservice.getData('products').subscribe((res) => {
      this.productslist = [];
      for (const [key, value] of Object.entries(res.payload.val())) {
        if (!value.isDeleted) {
          const product: Products = {
            key,
            id: value['id'],
            imageURL: value['imageURL'],
            name: value['name'],
            price: value['price'],
            isDeleted: value['isDeleted'],
            checked: this.estimates.isProductChecked(key),
            quantity: this.estimates.getQuantity(key)
          };
          this.storageRef.child(product.imageURL).getDownloadURL().then(url => {
            product.imageURL = url;
            this.productslist.push(product);
          }).catch(err => {
            this.productslist.push(product);
          });
        }
      }
    });
    this.subscriptions.push(sub);
  }

  init(): void {
    const sub = this.store.pipe(select(getLoggedInUser)).subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        if (user.role.role === USER.B2C) {
          this.quantities = [1, 2, 3, 4, 5];
        } else if (user.role.role === USER.B2B) {
          this.quantities = [10, 20, 30, 40, 50];
        } else if (user.role.role === USER.admin) {
          this.quantities = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50];
        } else {
          this.quantities = [1, 2, 3, 4, 5];
        }
      } else {
        this.isLoggedIn = false;
      }
    });
    this.subscriptions.push(sub);
  }

  checkChange(product: Products): void {
    this.estimates.addRemoveProduct(product);
  }

  showEstimates(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EstimatesDialogComponent, {
      width: '400px',
      data: { product: true }
    });

    const sub = dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // this.loadData();
      }
    });
    this.subscriptions.push(sub);
  }

  login(): void {
    this.dialog.open(LoginComponent, {
      width: '500px',
      height: '500px'
    });
  }
  imageLoadError(product: Products): void {
    product.imageURL = './assets/Images/PlaceholderImage150.png';
  }
}
