package com.vibgyorpaints.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vibgyorpaints.model.Theme;
import com.vibgyorpaints.repository.ThemeRepository;

@Service("themeService")
public class ThemeServiceImpl implements ThemeService {

	@Autowired
	private ThemeRepository themeRepository;

	@Override
	public List<Theme> getThemes() {
		return themeRepository.findAll();
	}

	@Override
	public Theme createTheme(Theme theme) {
		return themeRepository.saveAndFlush(theme);
	}

	@Override
	public Theme getTheme(Long id) {
		return themeRepository.getOne(id);
	}

	@Override
	public Theme update(Long id, Theme theme) {
		Theme existingTheme = themeRepository.getOne(id);
		BeanUtils.copyProperties(theme, existingTheme);
		return themeRepository.saveAndFlush(existingTheme);
	}

}
