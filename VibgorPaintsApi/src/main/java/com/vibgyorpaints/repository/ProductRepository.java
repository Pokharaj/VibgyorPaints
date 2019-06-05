package com.vibgyorpaints.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vibgyorpaints.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
