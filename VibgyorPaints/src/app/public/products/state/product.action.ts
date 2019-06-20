import { Action } from '@ngrx/store';
import { Product } from 'src/app/core/models/product';
import { Theme } from 'src/app/core/models/theme';

export enum ProductActionTypes {
  SetSelectedProducts = 'Set Selected Products',
  ClearSelectedProducts = 'Clear Selected Products',
  SetSelectedTheme = 'Set Selected Theme',
  ClearSelectedTheme = 'Clear Selected Theme'
}

export class SetSelectedProducts implements Action {
  readonly type = ProductActionTypes.SetSelectedProducts;

  constructor(public payload: Product) {}
}

export class ClearSelectedProducts implements Action {
  readonly type = ProductActionTypes.ClearSelectedProducts;

  constructor() {}
}

export class SetSelectedTheme implements Action {
  readonly type = ProductActionTypes.SetSelectedTheme;

  constructor(public payload: Theme) {}
}

export class ClearSelectedTheme implements Action {
  readonly type = ProductActionTypes.ClearSelectedTheme;

  constructor() {}
}

export type ProductActions =
  | SetSelectedProducts
  | ClearSelectedProducts
  | SetSelectedTheme
  | ClearSelectedTheme;
