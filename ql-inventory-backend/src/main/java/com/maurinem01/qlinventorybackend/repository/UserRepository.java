package com.maurinem01.qlinventorybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maurinem01.qlinventorybackend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
