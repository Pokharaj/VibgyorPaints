package com.vibgyorpaints.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vibgyorpaints.model.Login;
import com.vibgyorpaints.model.User;
import com.vibgyorpaints.repository.UserRepository;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@Override
	public User createUser(User user) {
		return userRepository.saveAndFlush(user);
	}

	@Override
	public User find(Login login) {
		return userRepository.find(login.getEmail(), login.getPassword());
	}

	@Override
	public User getUser(Long id) {
		return userRepository.getOne(id);
	}

	@Override
	public User update(Long id, User user) {
		User existingUser = userRepository.getOne(id);
		BeanUtils.copyProperties(user, existingUser);
		return userRepository.saveAndFlush(existingUser);
	}

	@Override
	public User delete(Long id) {
		User existingUser = userRepository.getOne(id);
		existingUser.setDeleted(true);
		return userRepository.saveAndFlush(existingUser);
	}
}
