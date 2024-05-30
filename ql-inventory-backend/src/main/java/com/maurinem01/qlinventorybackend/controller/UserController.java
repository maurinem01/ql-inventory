package com.maurinem01.qlinventorybackend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maurinem01.qlinventorybackend.exception.MissingFieldException;
import com.maurinem01.qlinventorybackend.model.User;
import com.maurinem01.qlinventorybackend.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}
	
	@PostMapping
	public ResponseEntity<User> saveUser(@RequestBody User user) {
		if (user.getIdentifier() == null || user.getIdentifier().isBlank()) {
			throw new MissingFieldException("Identifier");
		}
		if (user.getName() == null || user.getName().isBlank()) {
			throw new MissingFieldException("Name");
		}
		return new ResponseEntity<User>(userService.saveUser(user), HttpStatus.CREATED);
	}
	
	@GetMapping
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}
	
	@GetMapping("{identifier}")
	public ResponseEntity<User> getUserByIdentifier(@PathVariable("identifier") String identifier) {
		return new ResponseEntity<User>(userService.getUserByIdentifier(identifier), HttpStatus.OK);
	}
	
	@PutMapping("{identifier}")
	public ResponseEntity<User> updateUser(@PathVariable("identifier") String identifier, @RequestBody User user) {
		return new ResponseEntity<User>(userService.updateUser(user, identifier), HttpStatus.OK);
	}
	
	@DeleteMapping("{identifier}")
	public ResponseEntity<String> deleteUser(@PathVariable("identifier") String identifier) {
		userService.deleteUser(identifier);
		return new ResponseEntity<String>("User " + identifier + " deleted successfully!", HttpStatus.OK);
	}
	
}
