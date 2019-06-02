package com.vibgyorpaints.service;

import java.util.List;

import com.vibgyorpaints.model.Store;

public interface StoreService {

	List<Store> getStores();

	Store createStore(Store store);

	Store getStore(Long id);
	
	Store update(Long id, Store store);
	
}