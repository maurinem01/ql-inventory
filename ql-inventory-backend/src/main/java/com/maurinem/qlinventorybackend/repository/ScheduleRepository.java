package com.maurinem.qlinventorybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maurinem.qlinventorybackend.model.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

}
