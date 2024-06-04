package com.maurinem.qlinventorybackend.service;

import java.util.List;

import com.maurinem.qlinventorybackend.model.Schedule;

public interface ScheduleService {

	Schedule saveSchedule(Schedule schedule);

	List<Schedule> getAllSchedules();

	Schedule getScheduleById(long id);

	Schedule updateSchedule(Schedule schedule, long id);

	void deleteSchedule(long id);

}