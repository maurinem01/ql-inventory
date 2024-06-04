package com.maurinem.qlinventorybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maurinem.qlinventorybackend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
