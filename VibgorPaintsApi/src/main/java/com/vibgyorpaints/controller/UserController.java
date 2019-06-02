package com.vibgyorpaints.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.vibgyorpaints.model.Login;
import com.vibgyorpaints.model.User;
import com.vibgyorpaints.service.UserService;

@RestController
@RequestMapping("api/v1/")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "login", method = RequestMethod.POST)
	public User login(@RequestBody Login login) {
		return userService.find(login);
	}

	@RequestMapping(value = "users", method = RequestMethod.GET)
	public List<User> getUsers() {
		return userService.getUsers();
	}

	@RequestMapping(value = "user", method = RequestMethod.POST)
	public User create(@RequestBody User user) {
		return userService.createUser(user);
	}

	@RequestMapping(value = "user/{id}", method = RequestMethod.GET)
	public User getUser(@PathVariable("id") Long id) {
		return userService.getUser(id);
	}

	@RequestMapping(value = "user/{id}", method = RequestMethod.PUT)
	public User update(@PathVariable("id") Long id, @RequestBody User user) {
		return userService.update(id, user);
	}
}
