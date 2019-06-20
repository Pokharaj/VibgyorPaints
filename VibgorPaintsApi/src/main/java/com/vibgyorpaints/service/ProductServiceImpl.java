package com.vibgyorpaints.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vibgyorpaints.model.Product;
import com.vibgyorpaints.repository.ProductRepository;

@Service("productService")
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Override
	public List<Product> getProducts() {
		return productRepository.findAll();
	}

	@Override
	public Product createProduct(Product product) {
		return productRepository.saveAndFlush(product);
	}

	@Override
	public Product getProduct(Long id) {
		return productRepository.getOne(id);
	}

	@Override
	public Product update(Long id, Product product) {
		Product existingProduct = productRepository.getOne(id);
		BeanUtils.copyProperties(product, existingProduct);
		return productRepository.saveAndFlush(existingProduct);
	}

	@Override
	public List<Product> findByIdList(List<Integer> idList) {
		return productRepository.findAllByIdList(idList);
	}

}
