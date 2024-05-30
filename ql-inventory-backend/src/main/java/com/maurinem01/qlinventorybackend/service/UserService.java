package com.maurinem01.qlinventorybackend.service;

import java.util.List;

import com.maurinem01.qlinventorybackend.model.User;

public interface UserService {
	
	User saveUser(User user);
	
	List<User> getAllUsers();
	
	User getUserByIdentifier(String identifier);
	
	User updateUser(User user, String identifier);
	
	void deleteUser(String identifier);

}