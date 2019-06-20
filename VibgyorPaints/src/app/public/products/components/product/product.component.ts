import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Product } from 'src/app/core/models/product';
import { getLoggedInUser, UserState } from 'src/app/core/state/reducers/user.reducer';
import { LoginComponent } from 'src/app/public/components/login/login.component';
import { USER } from 'src/app/shared/constants';
import { EstimatesDialogComponent } from '../estimates-dialog/estimates-dialog.component';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductState } from '../../state/reducers/prouct.reducer';
import { SetSelectedProducts, ClearSelectedProducts } from '../../state/product.action';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[];

  constructor(private productService: ProductService,
              private store: Store<UserState>,
              private productStore: Store<ProductState>,
              private dialog: MatDialog) {
  }

  products: Product[];
  isLoggedIn = false;
  quantities: number[];
  loading = true;

  ngOnInit() {
    this.subscriptions = [];
    this.loadData();
    this.init();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(sub => {
        sub.unsubscribe();
      });
    }
  }

  loadData(): void {
    this.productStore.dispatch(new ClearSelectedProducts());
    const sub = this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.products.forEach((product: Product) => {
        product.imageUrl = this.productService.getImageUrl(product.imageUrl);
        if (!product.quantity) {
          product.quantity = 1;
        }
      });
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
        } else {
          this.quantities = [1, 2, 3, 4, 5];
        }
      } else {
        this.isLoggedIn = false;
      }
    });
    this.subscriptions.push(sub);
  }

  checkChange(product: Product): void {
    this.productStore.dispatch(new SetSelectedProducts(product));
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
  imageLoadError(product: Product): void {
    product.imageUrl = './assets/Images/PlaceholderImage150.png';
  }
}
