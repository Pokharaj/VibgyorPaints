import { TestBed } from '@angular/core/testing';

import { EstimatesService } from './estimates.service';
import { Product } from 'src/app/core/models/product';
import { Theme } from 'src/app/core/models/theme';

describe('EstimatesService', () => {
  let estimateService: EstimatesService;
  const product: Product = {
    id: 1,
    productId: 100,
    productName: 'Product1',
    imageUrl: 'url',
    price: 100,
    quantity: 1,
    deleted: false
  };
  const theme: Theme = {
    id: 1,
    themeId: 101,
    themeName: 'theme1',
    imageUrl: 'url',
    materials: [product],
    deleted: false
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
