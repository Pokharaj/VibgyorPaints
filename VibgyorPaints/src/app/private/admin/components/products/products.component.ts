import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatTabChangeEvent, MatDialog } from '@angular/material';
import { Product } from 'src/app/core/models/product';
import { Subscription } from 'rxjs';
import { Theme } from 'src/app/core/models/theme';
import { NewProductFormComponent } from '../new-product-form/new-product-form.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { NewThemeFormComponent } from '../new-theme-form/new-theme-form.component';
import { ProductService } from 'src/app/core/services/product.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedProductColumns: string[] = ['name', 'price', 'deleted', 'edit'];
  displayedThemeColumns: string[] = ['name', 'price', 'material', 'deleted', 'edit'];
  productslist: Product[];
  themeslist: Theme[];
  productsDataSource: MatTableDataSource<Product>;
  themeDataSource: MatTableDataSource<Theme>;
  subscriptions: Subscription[];
  isLoading = true;
  productsPage = true;

  constructor(private productService: ProductService,
              private themeService: ThemeService,
              private dialog: MatDialog,
              private snakbarservice: SnackbarService) {
  }

  ngOnInit() {
    // this.storageRef = firebase.storage().ref();
    this.subscriptions = [];
    this.loadProductData();
    this.loadThemeData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  loadProductData(): void {
    this.productslist = [];
    const sub = this.productService.getProducts().subscribe((products: Product[]) => {
      this.productslist = products;
      this.productsDataSource = new MatTableDataSource<Product>(this.productslist);
      this.productsDataSource.paginator = this.paginator;
    });
    this.subscriptions.push(sub);
  }

  loadThemeData(): void {
    this.themeslist = [];
    const sub = this.themeService.getThemes().subscribe((themes: Theme[]) => {
      this.themeslist = themes;
      this.themeDataSource = new MatTableDataSource<Theme>(this.themeslist);
      this.isLoading = false;
    });
    this.subscriptions.push(sub);
  }

  calculatePrice(products: Product[]): number {
    let price = 0;
    products.forEach((product: Product) => {
      price += product.price;
    });
    return price;
  }

  getMaterialDescription(products: Product[]) {
    let result = '';
    products.forEach((product: Product) => {
      result += product.productName + ', ';
    });
    return result.substring(0, result.length - 3);
  }

  tabChangeEvent(tabChangeEvent: MatTabChangeEvent): void {
    switch (tabChangeEvent.index) {
      case 0:
        if (this.productsDataSource !== undefined) {
          this.productsDataSource.paginator = this.paginator;
        }
        this.productsPage = true;
        break;
      case 1:
        if (this.themeDataSource !== undefined) {
          this.themeDataSource.paginator = this.paginator;
        }
        this.productsPage = false;
        break;
    }
  }

  openProductsForm(product: Product) {
    const productDialogRef = this.dialog.open(NewProductFormComponent, {
      width: '400px',
      data: { product }
    });

    this.subscriptions.push(productDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadProductData();
        this.snakbarservice.openSnackBar('Product Details Saved', 'Close', 2000);
      }
    }));
  }

  openThemesForm(theme: Theme) {
    const themeDialogRef = this.dialog.open(NewThemeFormComponent, {
      width: '400px',
      data: { theme, products: this.productslist }
    });

    this.subscriptions.push(themeDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadThemeData();
        this.snakbarservice.openSnackBar('Theme Details Saved', 'Close', 2000);
      }
    }));
  }
}
