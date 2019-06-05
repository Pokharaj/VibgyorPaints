package com.vibgyorpaints.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Theme {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String themeName;
	private String imageUrl;
	private boolean deleted;

	@ManyToMany
	private List<Product> materials = new ArrayList<Product>();

	public Long getId() {
		return id;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public List<Product> getMaterials() {
		return materials;
	}

	public String getThemeName() {
		return themeName;
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

	public void setMaterials(List<Product> materials) {
		this.materials = materials;
	}

	public void setThemeName(String themeName) {
		this.themeName = themeName;
	}
}
