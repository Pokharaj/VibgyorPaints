package com.vibgyorpaints.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.vibgyorpaints.model.Visit;
import com.vibgyorpaints.service.VisitService;

@RestController
@RequestMapping("api/v1/")
public class VisitController {

	@Autowired
	private VisitService visitService;

	@RequestMapping(value = "visits", method = RequestMethod.GET)
	public List<Visit> getVisits() {
		return visitService.getVisits();
	}

	@RequestMapping(value = "visit", method = RequestMethod.POST)
	public Visit create(@RequestBody Visit visit) {
		return visitService.createVisit(visit);
	}

	@RequestMapping(value = "visit/{id}", method = RequestMethod.GET)
	public Visit getVisit(@PathVariable("id") Long id) {
		return visitService.getVisit(id);
	}

	@RequestMapping(value = "visit/{id}", method = RequestMethod.PUT)
	public Visit update(@PathVariable("id") Long id, @RequestBody Visit visit) {
		return visitService.update(id, visit);
	}

	@RequestMapping(value = "visit/user/{userid}", method = RequestMethod.GET)
	public List<Visit> findByUserId(@PathVariable("userid") Long userid) {
		return visitService.findByUserId(userid);
	}

}