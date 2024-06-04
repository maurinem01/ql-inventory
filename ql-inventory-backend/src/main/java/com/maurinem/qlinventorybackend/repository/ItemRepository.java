package com.maurinem.qlinventorybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maurinem.qlinventorybackend.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {

}
