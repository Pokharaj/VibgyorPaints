import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { EstimatesService } from '../../services/estimates.service';
import { Product } from 'src/app/core/models/product';
import { Theme } from 'src/app/core/models/theme';

@Component({
  selector: 'app-estimates-dialog',
  templateUrl: './estimates-dialog.component.html',
  styleUrls: ['./estimates-dialog.component.scss']
})
export class EstimatesDialogComponent implements OnInit {

  products: Product[];
  theme: Theme;
  isProduct: boolean;
  displayedColumns: string[];;
  dataSource: MatTableDataSource<Product>;
  constructor(private estimates: EstimatesService,
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
      this.displayedColumns = ['name', 'qty', 'price', 'total'];
      this.products = this.estimates.products;
      this.dataSource = new MatTableDataSource<Product>(this.products);
    } else {
      this.displayedColumns = ['name', 'price'];
      this.theme = this.estimates.theme;
      this.dataSource = new MatTableDataSource<Product>(this.theme.materials);
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
        total += (element.price * element.quantity);
      });
    }
    return total;
  }

  cancel(): void {
    this.estimates.selectTheme(null);
    this.dialogRef.close(null);
  }

}
