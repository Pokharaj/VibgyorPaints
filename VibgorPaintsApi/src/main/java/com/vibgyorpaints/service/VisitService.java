package com.vibgyorpaints.service;

import java.util.List;

import com.vibgyorpaints.model.Visit;

public interface VisitService {

	List<Visit> getVisits();

	Visit createVisit(Visit Visit);

	Visit getVisit(Long id);
	
	Visit update(Long id, Visit Visit);
	
	List<Visit> findByUserId(Long userid);
	
}