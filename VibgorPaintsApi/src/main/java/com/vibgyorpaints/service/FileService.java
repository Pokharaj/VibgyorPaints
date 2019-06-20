package com.vibgyorpaints.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {

	@Value("${product.image.path}")
	private String productImagePath;

	@Value("${theme.image.path}")
	private String themeImagePath;

	public String createFileName(String origionalFileName) {
		String filename = "";

		int index = origionalFileName.lastIndexOf(".");
		if (index != -1) {
			filename += origionalFileName.substring(0, index) + System.currentTimeMillis() + "."
					+ origionalFileName.substring(index + 1);
		}
		if (filename.equalsIgnoreCase("")) {
			return origionalFileName;
		}
		return filename;
	}

	public String saveFile(MultipartFile file, String path) {

		String fileName = createFileName(file.getOriginalFilename());
		File convertedFile = new File(path + fileName);
		try {
			convertedFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(convertedFile);
			fos.write(file.getBytes());
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return fileName;
	}

	public String saveProductImage(MultipartFile file) {
		return saveFile(file, productImagePath);
	}

	public String saveThemeImage(MultipartFile file) {
		return saveFile(file, themeImagePath);
	}

	public File getProductFile(String filename) {
		return new File(productImagePath + filename);
	}

	public File getThemeFile(String filename) {
		return new File(themeImagePath + filename);
	}
}
