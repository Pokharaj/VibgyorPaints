package com.vibgyorpaints.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.vibgyorpaints.model.Store;
import com.vibgyorpaints.service.StoreService;

@RestController
@RequestMapping("api/v1/")
public class StoreController {

	@Autowired
	private StoreService storeService;

	@RequestMapping(value = "stores", method = RequestMethod.GET)
	public List<Store> getStores() {
		return storeService.getStores();
	}

	@RequestMapping(value = "store", method = RequestMethod.POST)
	public Store create(@RequestBody Store Store) {
		return storeService.createStore(Store);
	}

	@RequestMapping(value = "store/{id}", method = RequestMethod.GET)
	public Store getStore(@PathVariable("id") Long id) {
		return storeService.getStore(id);
	}

	@RequestMapping(value = "store/{id}", method = RequestMethod.PUT)
	public Store update(@PathVariable("id") Long id, @RequestBody Store Store) {
		return storeService.update(id, Store);
	}
}
