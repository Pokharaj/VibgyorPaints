import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { EstimatesService } from '../../services/estimates.service';
import { Products } from 'src/app/core/models/products';
import { Themes } from 'src/app/core/models/themes';

@Component({
  selector: 'app-estimates-dialog',
  templateUrl: './estimates-dialog.component.html',
  styleUrls: ['./estimates-dialog.component.scss']
})
export class EstimatesDialogComponent implements OnInit {

  products: Products[];
  theme: Themes;
  isProduct: boolean;
  displayedColumns: string[];;
  dataSource: MatTableDataSource<Products>;
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
      this.dataSource = new MatTableDataSource<Products>(this.products);
    } else {
      this.displayedColumns = ['name', 'price'];
      this.theme = this.estimates.theme;
      this.dataSource = new MatTableDataSource<Products>(this.theme.material);
    }
  }

  getTotalPrice(): number {
    let total = 0;
    if (this.isProduct) {
      this.products.forEach((element) => {
        total += (element.price * element.quantity);
      });
    } else {
      this.theme.material.forEach((element) => {
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
