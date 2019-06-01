import { Injectable } from '@angular/core';
import { Products } from 'src/app/core/models/products';
import { Themes } from 'src/app/core/models/themes';

@Injectable({
  providedIn: 'root'
})
export class EstimatesService {

  private selectedProducts: Products[];
  private selectedTheme: Themes;

  constructor() {
    this.selectedProducts = [];
    this.selectedTheme = null;
  }

  get products(): Products[] {
    return this.selectedProducts;
  }

  get theme(): Themes {
    return this.selectedTheme;
  }

  addRemoveProduct(product: Products): void {
    let found = false;
    for (let i = 0; i < this.selectedProducts.length; i++) {
      if (this.selectedProducts[i].key === product.key) {
        found = true;
        break;
      }
    }
    if (found) {
      this.selectedProducts = this.selectedProducts.filter((prod) => prod.key !== product.key);
    } else {
      this.selectedProducts.push(product);
    }
  }

  selectTheme(theme: Themes): void {
    this.selectedTheme = theme;
  }

  isProductChecked(key: string): boolean {
    let found = false;
    this.selectedProducts.forEach((element) => {
      if (element.key === key) {
        found = true;
      }
    });
    return found;
  }

  getQuantity(key: string): number {
    let quantity = 1;
    this.selectedProducts.forEach((element) => {
      if (element.key === key) {
        quantity = element.quantity;
      }
    });
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
