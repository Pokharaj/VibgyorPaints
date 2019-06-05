package com.vibgyorpaints.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String productName;
	private float price;
	private String imageUrl;
	private boolean deleted;

	public Long getId() {
		return id;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public float getPrice() {
		return price;
	}

	public String getProductName() {
		return productName;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}
}
