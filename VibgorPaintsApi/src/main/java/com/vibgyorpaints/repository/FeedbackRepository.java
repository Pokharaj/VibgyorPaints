package com.vibgyorpaints.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vibgyorpaints.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

}
