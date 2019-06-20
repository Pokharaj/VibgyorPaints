import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActionTypes, ProductActions } from '../product.action';
import { Product } from 'src/app/core/models/product';
import { Theme } from 'src/app/core/models/theme';

export interface ProductState {
  selectedProducts: Product[];
  selectedTheme: Theme;
}

const initialState: ProductState = {
  selectedProducts: [],
  selectedTheme : null
};

const getProductState = createFeatureSelector<ProductState>('product');

export const getSelectedProducts = createSelector(
  getProductState,
  state => state.selectedProducts
);

export const getSelectedTheme = createSelector(
  getProductState,
  state => state.selectedTheme
);

export function productReducer(state = initialState, action: ProductActions ): ProductState {
  switch (action.type) {

    case ProductActionTypes.SetSelectedProducts:
      let selectedProducts: Product[] = state.selectedProducts;
      let found = false;
      for (const product of selectedProducts) {
        if (product.id === action.payload.id) {
          found = true;
          break;
        }
      }
      if (found) {
        selectedProducts = selectedProducts.filter((product: Product) =>
          product.id !== action.payload.id);
      } else {
        selectedProducts.push(action.payload);
      }
      return { ...state, selectedProducts };

    case ProductActionTypes.ClearSelectedProducts:
      return { ...state, selectedProducts: [] };

    case ProductActionTypes.SetSelectedTheme:
      return { ...state, selectedTheme: action.payload };

    case ProductActionTypes.SetSelectedTheme:
        return { ...state, selectedTheme: null };

    default:
      return state;
  }
}
