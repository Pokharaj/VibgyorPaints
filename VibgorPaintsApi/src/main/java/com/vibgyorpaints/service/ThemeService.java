package com.vibgyorpaints.service;

import java.util.List;

import com.vibgyorpaints.model.Theme;

public interface ThemeService {

	List<Theme> getThemes();

	Theme createTheme(Theme theme);

	Theme getTheme(Long id);

	Theme update(Long id, Theme theme);

}