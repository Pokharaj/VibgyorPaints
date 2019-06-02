package com.vibgyorpaints.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vibgyorpaints.model.Login;
import com.vibgyorpaints.model.Role;
import com.vibgyorpaints.model.User;
import com.vibgyorpaints.repository.RoleRepository;
import com.vibgyorpaints.repository.UserRepository;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;

	@Override
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@Override
	public User createUser(User user) {
	Role role = roleRepository.findByName(user.getRole().getRole());
	if (role != null) {
		user.setRole(role);
	} else {
		role = roleRepository.saveAndFlush(user.getRole());
		user.setRole(role);
	}
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
}
