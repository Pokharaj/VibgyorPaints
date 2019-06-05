package com.vibgyorpaints.service;

import org.springframework.stereotype.Service;

@Service
public class FileService {

	public String createFileName(String origionalFileName) {
		String filename = "";

		int index = origionalFileName.lastIndexOf(".");
		if (index != -1) {
			filename += origionalFileName.substring(0, index) + System.currentTimeMillis()
					+ "." + origionalFileName.substring(index + 1);
		}
		if (filename.equalsIgnoreCase("")) {
			return origionalFileName;
		}
		return filename;
	}
}
