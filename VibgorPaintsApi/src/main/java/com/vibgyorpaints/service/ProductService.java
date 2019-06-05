package com.vibgyorpaints.service;

import java.util.List;

import com.vibgyorpaints.model.Product;

public interface ProductService {

	List<Product> getProducts();

	Product createProduct(Product product);

	Product getProduct(Long id);

	Product update(Long id, Product product);

}