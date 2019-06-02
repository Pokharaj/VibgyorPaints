package com.vibgyorpaints.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vibgyorpaints.model.Visit;
import com.vibgyorpaints.repository.VisitRepository;

@Service("visitService")
public class VisitServiceImpl implements VisitService {

	@Autowired
	private VisitRepository visitRepository;
	
//	@Autowired
//	private UserRepository userRepository;

	@Override
	public List<Visit> getVisits() {
		return visitRepository.findAll();
	}

	@Override
	public Visit createVisit(Visit visit) {
//		User user = userRepository.getOne(visit.getUser().getId());
		
		visit = visitRepository.saveAndFlush(visit);
//		user.getVisits().add(visit);
//		userRepository.saveAndFlush(user);
		return visit;
	}

	@Override
	public Visit getVisit(Long id) {
		return visitRepository.getOne(id);
	}

	@Override
	public Visit update(Long id, Visit visit) {
		Visit existingVisit = visitRepository.getOne(id);
		BeanUtils.copyProperties(visit, existingVisit);
		return visitRepository.saveAndFlush(visit);
	}

	@Override
	public List<Visit> findByUserId(Long userid) {
		return visitRepository.findByUserId(userid);
	}

}
