import { TestBed } from '@angular/core/testing';

import { EstimatesService } from './estimates.service';
import { Products } from 'src/app/core/models/products';
import { Themes } from 'src/app/core/models/themes';

describe('EstimatesService', () => {
  let estimateService: EstimatesService;
  const product: Products = {
    key: '0',
    name: 'Product1',
    id: 1,
    imageURL: 'url',
    price: 100,
    quantity: 1,
    checked: false,
    isDeleted: false
  };
  const theme: Themes = {
    key: '0',
    id: 1,
    name: 'theme1',
    imageURL: 'url',
    material: [product],
    price: product.price,
    isDeleted: false
  };

  it('should not have any products at the begining', () => {
    // Arrange
    estimateService = new EstimatesService();

    // Act

    // Assert
    expect(estimateService.products.length).toBe(0);
  });

  it('should have theme as null at the begining', () => {
    estimateService = new EstimatesService();

    expect(estimateService.theme).toBeNull();
  });

  it('should add a product', () => {
    estimateService = new EstimatesService();

    estimateService.addRemoveProduct(product);

    expect(estimateService.products.length).toBe(1);
  });

  it('should add a theme', () => {
    estimateService = new EstimatesService();

    estimateService.selectTheme(theme);

    expect(estimateService.theme).toBe(theme);
  });

  it('should clear all the data', () => {
    estimateService = new EstimatesService();

    estimateService.addRemoveProduct(product);
    estimateService.selectTheme(theme);
    estimateService.clear();

    expect(estimateService.products.length).toBe(0);
    expect(estimateService.theme).toBeNull();
  });
});
