package com.vibgyorpaints.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Visit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private User user;

	private Date visitDate;
	private Date requestDate;
	private String description;
	private String comment;
	private boolean canceled;
	private boolean rejected;

	public String getComment() {
		return comment;
	}

	public String getDescription() {
		return description;
	}

	public Long getId() {
		return id;
	}

	public Date getRequestDate() {
		return requestDate;
	}

	public User getUser() {
		return user;
	}

	public Date getVisitDate() {
		return visitDate;
	}

	public boolean isCanceled() {
		return canceled;
	}

	public boolean isRejected() {
		return rejected;
	}

	public void setCanceled(boolean canceled) {
		this.canceled = canceled;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setRejected(boolean rejected) {
		this.rejected = rejected;
	}

	public void setRequestDate(Date requestDate) {
		this.requestDate = requestDate;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setVisitDate(Date visitDate) {
		this.visitDate = visitDate;
	}
}
