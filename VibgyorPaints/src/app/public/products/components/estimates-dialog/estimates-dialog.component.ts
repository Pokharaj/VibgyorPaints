import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Product } from 'src/app/core/models/product';
import { Theme } from 'src/app/core/models/theme';
import { ProductState, getSelectedProducts, getSelectedTheme } from '../../state/reducers/prouct.reducer';
import { Store, select } from '@ngrx/store';
import { ClearSelectedTheme } from '../../state/product.action';

@Component({
  selector: 'app-estimates-dialog',
  templateUrl: './estimates-dialog.component.html',
  styleUrls: ['./estimates-dialog.component.scss']
})
export class EstimatesDialogComponent implements OnInit {

  products: Product[];
  theme: Theme;
  isProduct: boolean;
  displayedColumns: string[];
  dataSource: MatTableDataSource<Product>;

  constructor(private productStore: Store<ProductState>,
              public dialogRef: MatDialogRef<EstimatesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data
    ) {
      this.isProduct = data.product;
    }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    if (this.isProduct) {
      this.products = [];
      this.displayedColumns = ['name', 'qty', 'price', 'total'];
      this.productStore.pipe(select(getSelectedProducts)).subscribe((products: Product[]) => {
        this.products = products;
        this.dataSource = new MatTableDataSource<Product>(this.products);
      });
    } else {
      this.displayedColumns = ['name', 'price'];
      this.productStore.pipe(select(getSelectedTheme)).subscribe((theme: Theme) => {
        this.theme = theme;
        this.dataSource = new MatTableDataSource<Product>(this.theme.materials);
      });
    }
  }

  getTotalPrice(): number {
    let total = 0;
    if (this.isProduct) {
      this.products.forEach((element) => {
        total += (element.price * element.quantity);
      });
    } else {
      this.theme.materials.forEach((element) => {
        total += (element.price);
      });
    }
    return total;
  }

  cancel(): void {
    this.productStore.dispatch(new ClearSelectedTheme());
    this.dialogRef.close(null);
  }

}
