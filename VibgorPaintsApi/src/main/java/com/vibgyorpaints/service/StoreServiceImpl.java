package com.vibgyorpaints.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vibgyorpaints.model.City;
import com.vibgyorpaints.model.Store;
import com.vibgyorpaints.repository.CityRepository;
import com.vibgyorpaints.repository.StoreRepository;

@Service("storeService")
public class StoreServiceImpl implements StoreService {

	@Autowired
	private StoreRepository storeRepository;

	@Autowired
	private CityRepository cityRepository;

	@Override
	public List<Store> getStores() {
		return storeRepository.findAll();
	}

	@Override
	public Store createStore(Store store) {
		City city = cityRepository.findByName(store.getCity().getName());
		if (city != null) {
			store.setCity(city);
		} else {
			city = cityRepository.saveAndFlush(store.getCity());
			store.setCity(city);
		}
		return storeRepository.saveAndFlush(store);
	}

	@Override
	public Store getStore(Long id) {
		return storeRepository.getOne(id);
	}

	@Override
	public Store update(Long id, Store store) {
		Store existingStore = storeRepository.getOne(id);
		BeanUtils.copyProperties(store, existingStore);
		return storeRepository.saveAndFlush(existingStore);
	}
}
