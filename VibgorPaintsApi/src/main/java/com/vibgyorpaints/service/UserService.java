package com.vibgyorpaints.service;

import java.util.List;

import com.vibgyorpaints.model.Login;
import com.vibgyorpaints.model.User;

public interface UserService {

	List<User> getUsers();

	User createUser(User user);

	User getUser(Long id);
	
	User find(Login login);
	
	User update(Long id, User user);
	
	User delete(Long id);
	
}