package com.vibgyorpaints.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vibgyorpaints.model.Visit;

public interface VisitRepository extends JpaRepository<Visit, Long> {

	@Query("SELECT visit FROM Visit visit WHERE visit.user.id = :userid")
	public List<Visit> findByUserId(@Param("userid") Long userid);
	
}
