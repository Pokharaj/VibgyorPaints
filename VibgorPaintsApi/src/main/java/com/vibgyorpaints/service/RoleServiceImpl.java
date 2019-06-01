package com.vibgyorpaints.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vibgyorpaints.model.Role;
import com.vibgyorpaints.repository.RoleRepository;

@Service("roleService")
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public List<Role> getRoles() {
		return roleRepository.findAll();
	}

	@Override
	public Role createRole(Role Role) {
		return roleRepository.saveAndFlush(Role);
	}

	@Override
	public Role getRole(Long id) {
		return roleRepository.getOne(id);
	}
}
