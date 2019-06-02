package com.vibgyorpaints.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vibgyorpaints.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	@Query("SELECT user FROM User user WHERE user.email = :email and user.password = :password")
	public User find(@Param("email") String email, @Param("password") String password);
}
