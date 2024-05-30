package com.maurinem01.qlinventorybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maurinem01.qlinventorybackend.model.Part;

public interface PartRepository extends JpaRepository<Part, Long> {

}
