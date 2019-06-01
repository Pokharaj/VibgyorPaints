package com.vibgyorpaints;

import org.junit.Test;
import org.springframework.web.client.RestTemplate;

import com.vibgyorpaints.model.Role;
import com.vibgyorpaints.model.User;

public class UserControllerTest {

	@Test
	public void testCreateUser() {
		RestTemplate restTemplate = new RestTemplate();

		User user = new User();
		user.setEmail("pokharaj@gmail.com");
		user.setPassword("password");
		user.setFirstname("Pokharaj");
				
		Role role = new Role();
		role.setRole("B2C");
		
		user.setRole(role);

		user = restTemplate.postForObject("http://localhost:8080/api/v1/user", user, User.class);
		
		System.out.println(user.getFirstname());
	}

}
