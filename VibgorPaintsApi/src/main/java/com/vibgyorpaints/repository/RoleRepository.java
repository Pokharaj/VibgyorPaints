package com.vibgyorpaints.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vibgyorpaints.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

	@Query("SELECT role FROM Role role WHERE role.role = :role")
	public Role findByName(@Param("role") String role);
}
