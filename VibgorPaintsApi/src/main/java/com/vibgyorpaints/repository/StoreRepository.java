package com.vibgyorpaints.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vibgyorpaints.model.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {

}
