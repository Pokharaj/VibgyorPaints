package com.vibgyorpaints.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
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

import com.vibgyorpaints.model.Product;
import com.vibgyorpaints.service.FileService;
import com.vibgyorpaints.service.ProductService;

@RestController
@RequestMapping("api/v1/")
public class ProductController {

//	final String filelocation = "D:\\Projects\\Spring\\Pluralsight\\VibgyorPaints\\Uploads\\Product\\";
	final String filelocation = "C:\\Users\\M1051719\\Documents\\Projects\\Training\\Spring\\Workspace\\VibgyorPaints\\Uploads\\Product\\";

	@Autowired
	private ProductService productService;

	@Autowired
	private FileService fileService;

	@RequestMapping(value = "products", method = RequestMethod.GET)
	public List<Product> getProducts() {
		return productService.getProducts();
	}

	@RequestMapping(value = "file/upload", method = RequestMethod.POST)
	public String uploadImage(@RequestParam("file") MultipartFile file) {
		String filename = fileService.createFileName(file.getOriginalFilename());
		File convertedFile = new File(filelocation + filename);
		try {
			convertedFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(convertedFile);
			fos.write(file.getBytes());
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return filename;
	}

	@RequestMapping(value = "file/download/{filename}", method = RequestMethod.GET)
	public ResponseEntity<InputStreamResource> downloadImage(@PathVariable("filename") String filename)
			throws IOException {
		File file = new File(filelocation + filename);
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG)
				.body(new InputStreamResource(new FileInputStream(file)));
	}

	@RequestMapping(value = "product", method = RequestMethod.POST)
	public Product create(@RequestBody Product product) {
		return productService.createProduct(product);
	}

	@RequestMapping(value = "product/{id}", method = RequestMethod.GET)
	public Product getProduct(@PathVariable("id") Long id) {
		return productService.getProduct(id);
	}

	@RequestMapping(value = "product/{id}", method = RequestMethod.PUT)
	public Product update(@PathVariable("id") Long id, @RequestBody Product product) {
		return productService.update(id, product);
	}
}
