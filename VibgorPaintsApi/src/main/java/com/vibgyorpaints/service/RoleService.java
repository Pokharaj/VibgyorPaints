package com.vibgyorpaints.service;

import java.util.List;

import com.vibgyorpaints.model.Role;

public interface RoleService {

	List<Role> getRoles();

	Role createRole(Role Role);

	Role getRole(Long id);

}