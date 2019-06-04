package com.vibgyorpaints.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.vibgyorpaints.model.Feedback;
import com.vibgyorpaints.service.FeedbackService;

@RestController
@RequestMapping("api/v1/")
public class FeedbackController {

	@Autowired
	private FeedbackService FeedbackService;

	@RequestMapping(value = "feedbacks", method = RequestMethod.GET)
	public List<Feedback> getFeedbacks() {
		return FeedbackService.getFeedbacks();
	}

	@RequestMapping(value = "feedback", method = RequestMethod.POST)
	public Feedback create(@RequestBody Feedback Feedback) {
		return FeedbackService.createFeedback(Feedback);
	}

	@RequestMapping(value = "feedback/{id}", method = RequestMethod.GET)
	public Feedback getFeedback(@PathVariable("id") Long id) {
		return FeedbackService.getFeedback(id);
	}

	@RequestMapping(value = "feedback/{id}", method = RequestMethod.PUT)
	public Feedback update(@PathVariable("id") Long id, @RequestBody Feedback Feedback) {
		return FeedbackService.update(id, Feedback);
	}
}
