package com.maurinem01.qlinventorybackend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.maurinem01.qlinventorybackend.exception.ResourceNotFoundException;
import com.maurinem01.qlinventorybackend.model.User;
import com.maurinem01.qlinventorybackend.repository.UserRepository;
import com.maurinem01.qlinventorybackend.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	private UserRepository userRepository;
	
	public UserServiceImpl(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@Override
	public User saveUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public User getUserByIdentifier(String identifier) {
		for (User x : getAllUsers()) {
			if (x.getIdentifier().toUpperCase().equals(identifier)) {
				return x;
			}
		}
		throw new ResourceNotFoundException("User", "Identifier", identifier);
	}

	@Override
	public User updateUser(User user, String identifier) {
		User existingUser = getUserByIdentifier(identifier);
		existingUser.setName(user.getName());
		existingUser.setPhone(user.getPhone());
		existingUser.setPhotographySet(user.getPhotographySet());
		userRepository.save(existingUser);
		return existingUser;
	}

	@Override
	public void deleteUser(String identifier) {
		User existingUser = getUserByIdentifier(identifier);
		userRepository.deleteById(existingUser.getId());
	}

}
