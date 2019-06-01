import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { MatTableDataSource, MatPaginator, MatTabChangeEvent, MatDialog } from '@angular/material';
import { Products } from 'src/app/core/models/products';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { Themes } from 'src/app/core/models/themes';
import { NewProductFormComponent } from '../new-product-form/new-product-form.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { NewThemeFormComponent } from '../new-theme-form/new-theme-form.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedProductColumns: string[] = ['name', 'price', 'deleted', 'edit'];
  displayedThemeColumns: string[] = ['name', 'price', 'material', 'deleted', 'edit'];
  productslist: Products[];
  themeslist: Themes[];
  productsDataSource: MatTableDataSource<Products>;
  themeDataSource: MatTableDataSource<Themes>;
  storageRef: firebase.storage.Reference;
  subscriptions: Subscription[];
  isLoading = true;
  productsPage = true;

  constructor(private userservice: UserService,
              private dialog: MatDialog,
              private snakbarservice: SnackbarService) {
    this.storageRef = firebase.storage().ref();
    this.subscriptions = [];
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  loadData(): void {
    let sub = this.userservice.getData('products').subscribe(res => {
      this.productslist = [];
      for (const [key, value] of Object.entries(res.payload.val())) {
        this.productslist.push({
          key,
          id: value.id,
          imageURL: value.imageURL,
          name: value.name,
          price: value.price,
          isDeleted: value.isDeleted,
          checked: false,
          quantity: -1
        });
      }
      this.productsDataSource = new MatTableDataSource<Products>(this.productslist);
      this.productsDataSource.paginator = this.paginator;
    });

    sub = this.userservice.getData('themes').subscribe((res) => {
      this.themeslist = [];
      for (const [key, value] of Object.entries(res.payload.val())) {
        const theme: Themes = {
          key,
          id: value.id,
          imageURL: value.imageURL,
          name: value.name,
          isDeleted: value.isDeleted,
          price: null,
          material: []
        };
        this.getThemeMaterialsAndPrice(this.productslist, theme, value.material);
        this.themeslist.push(theme);
      }
      this.themeDataSource = new MatTableDataSource<Themes>(this.themeslist);
      this.isLoading = false;
    });
    this.subscriptions.push(sub);
  }

  getThemeMaterialsAndPrice(products, theme, materials) {
    const materialsArray: Products[] = [];
    let themePrice = 0;
    products.filter(res => {
      if (materials.includes(res.id)) {
        themePrice += +res.price;
        materialsArray.push(res);
      }
    });
    theme.material = materialsArray;
    theme.price = themePrice;
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

  getMaterialsString(materials: Products[]) {
    let result = '';
    materials.forEach((element) => {
      result += element.name + ', ';
    });
    return result.substring(0, result.length - 3);
  }

  openProductsForm(product: Products) {
    const productDialogRef = this.dialog.open(NewProductFormComponent, {
      width: '400px',
      data: { data: product, newid: this.productslist.length }
    });

    this.subscriptions.push(productDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.snakbarservice.openSnackBar('Product Details Saved', 'Close', 2000);
      }
    }));
  }

  openThemesForm(theme: Themes) {
    const themeDialogRef = this.dialog.open(NewThemeFormComponent, {
      width: '400px',
      data: { data: theme, newid: this.themeslist.length, products: this.productslist }
    });

    this.subscriptions.push(themeDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.snakbarservice.openSnackBar('Theme Details Saved', 'Close', 2000);
      }
    }));
  }
}
