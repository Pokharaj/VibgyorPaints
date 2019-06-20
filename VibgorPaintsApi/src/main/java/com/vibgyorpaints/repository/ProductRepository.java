package com.vibgyorpaints.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vibgyorpaints.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	
	@Query("SELECT product FROM Product product WHERE product.id in :idList")
	public List<Product> findAllByIdList(@Param("idList") List<Integer> idList);

}
