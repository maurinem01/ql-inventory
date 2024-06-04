package com.maurinem.qlinventorybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maurinem.qlinventorybackend.model.Part;

public interface PartRepository extends JpaRepository<Part, Long> {

}
