package com.vibgyorpaints.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vibgyorpaints.model.Theme;
import com.vibgyorpaints.service.FileService;
import com.vibgyorpaints.service.ThemeService;

@RestController
@RequestMapping("api/v1/")
public class ThemeController {

	@Autowired
	private ThemeService themeService;

	@Autowired
	private FileService fileService;

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

	@RequestMapping(value = "theme/file/upload", method = RequestMethod.POST)
	public String uploadImage(@RequestParam("file") MultipartFile file) {
		return fileService.saveThemeImage(file);
	}

	@RequestMapping(value = "theme/file/download/{filename}", method = RequestMethod.GET)
	public ResponseEntity<InputStreamResource> downloadImage(@PathVariable("filename") String filename)
			throws IOException {
		File file = fileService.getThemeFile(filename);
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG)
				.body(new InputStreamResource(new FileInputStream(file)));
	}
}
