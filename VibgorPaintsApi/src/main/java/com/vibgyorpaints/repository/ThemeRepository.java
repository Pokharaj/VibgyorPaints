package com.vibgyorpaints.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vibgyorpaints.model.Theme;

public interface ThemeRepository extends JpaRepository<Theme, Long> {

}
