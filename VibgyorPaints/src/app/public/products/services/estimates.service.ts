import { Injectable } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { Theme } from 'src/app/core/models/theme';

@Injectable({
  providedIn: 'root'
})
export class EstimatesService {

  private selectedProducts: Product[];
  private selectedTheme: Theme;

  constructor() {
    this.selectedProducts = [];
    this.selectedTheme = null;
  }

  get products(): Product[] {
    return this.selectedProducts;
  }

  get theme(): Theme {
    return this.selectedTheme;
  }

  addRemoveProduct(product: Product): void {
    let found = false;
    // for (let i = 0; i < this.selectedProducts.length; i++) {
    //   if (this.selectedProducts[i].key === product.key) {
    //     found = true;
    //     break;
    //   }
    // }
    // if (found) {
    //   this.selectedProducts = this.selectedProducts.filter((prod) => prod.key !== product.key);
    // } else {
    //   this.selectedProducts.push(product);
    // }
  }

  selectTheme(theme: Theme): void {
    this.selectedTheme = theme;
  }

  isProductChecked(key: string): boolean {
    let found = false;
    // this.selectedProducts.forEach((element) => {
    //   if (element.key === key) {
    //     found = true;
    //   }
    // });
    return found;
  }

  getQuantity(key: string): number {
    let quantity = 1;
    // this.selectedProducts.forEach((element) => {
    //   if (element.key === key) {
    //     quantity = element.quantity;
    //   }
    // });
    return quantity;
  }

  // isThemeChecked(key: string): boolean {
  //   return this.selectedTheme.key === key;
  // }

  clear(): void {
    this.selectedProducts = [];
    this.selectedTheme = null;
  }
}
