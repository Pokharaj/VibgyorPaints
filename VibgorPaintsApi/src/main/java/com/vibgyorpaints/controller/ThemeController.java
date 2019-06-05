package com.vibgyorpaints.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.vibgyorpaints.model.Theme;
import com.vibgyorpaints.service.ThemeService;

@RestController
@RequestMapping("api/v1/")
public class ThemeController {

	@Autowired
	private ThemeService themeService;

	@RequestMapping(value = "themes", method = RequestMethod.GET)
	public List<Theme> getThemes() {
		return themeService.getThemes();
	}

	@RequestMapping(value = "theme", method = RequestMethod.POST)
	public Theme create(@RequestBody Theme theme) {
		return themeService.createTheme(theme);
	}

	@RequestMapping(value = "theme/{id}", method = RequestMethod.GET)
	public Theme getTheme(@PathVariable("id") Long id) {
		return themeService.getTheme(id);
	}

	@RequestMapping(value = "theme/{id}", method = RequestMethod.PUT)
	public Theme update(@PathVariable("id") Long id, @RequestBody Theme theme) {
		return themeService.update(id, theme);
	}
}
