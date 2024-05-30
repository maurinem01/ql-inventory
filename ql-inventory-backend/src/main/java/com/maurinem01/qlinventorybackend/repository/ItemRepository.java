package com.maurinem01.qlinventorybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maurinem01.qlinventorybackend.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {

}
