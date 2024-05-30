package com.maurinem01.qlinventorybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maurinem01.qlinventorybackend.model.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

}
