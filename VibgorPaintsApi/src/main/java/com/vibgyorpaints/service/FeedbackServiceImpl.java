package com.vibgyorpaints.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vibgyorpaints.model.Feedback;
import com.vibgyorpaints.repository.FeedbackRepository;

@Service("feedbackService")
public class FeedbackServiceImpl implements FeedbackService {

	@Autowired
	private FeedbackRepository feedbackRepository;

	@Override
	public List<Feedback> getFeedbacks() {
		return feedbackRepository.findAll();
	}

	@Override
	public Feedback createFeedback(Feedback feedback) {
		return feedbackRepository.saveAndFlush(feedback);
	}

	@Override
	public Feedback getFeedback(Long id) {
		return feedbackRepository.getOne(id);
	}

	@Override
	public Feedback update(Long id, Feedback feedback) {
		Feedback existingFeedback = feedbackRepository.getOne(id);
		BeanUtils.copyProperties(feedback, existingFeedback);
		return feedbackRepository.saveAndFlush(existingFeedback);
	}

}
