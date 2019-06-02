package com.vibgyorpaints.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vibgyorpaints.model.City;

public interface CityRepository extends JpaRepository<City, Long> {

	@Query("SELECT city FROM City city WHERE UPPER(city.name) = UPPER(:name)")
	public City findByName(@Param("name") String name);
}
