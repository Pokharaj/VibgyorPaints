package com.vibgyorpaints.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Feedback {

	@Id
	@GeneratedValue
	private Long id;
	@ManyToOne
	private User user;
	private Date date;
	private String comment;

	public String getComment() {
		return comment;
	}

	public Date getDate() {
		return date;
	}

	public Long getId() {
		return id;
	}

	public User getUser() {
		return user;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
