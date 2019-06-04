package com.vibgyorpaints.service;

import java.util.List;

import com.vibgyorpaints.model.Feedback;

public interface FeedbackService {

	List<Feedback> getFeedbacks();

	Feedback createFeedback(Feedback Feedback);

	Feedback getFeedback(Long id);
	
	Feedback update(Long id, Feedback Feedback);
	
}