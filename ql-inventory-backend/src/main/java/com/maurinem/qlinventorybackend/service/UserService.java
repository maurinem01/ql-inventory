package com.maurinem.qlinventorybackend.service;

import java.util.List;

import com.maurinem.qlinventorybackend.model.User;

public interface UserService {

	User saveUser(User user);

	List<User> getAllUsers();

	User getUserByIdentifier(String identifier);

	User updateUser(User user, String identifier);

	void deleteUser(String identifier);

}