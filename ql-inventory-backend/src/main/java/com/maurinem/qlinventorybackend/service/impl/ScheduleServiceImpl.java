package com.maurinem.qlinventorybackend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.maurinem.qlinventorybackend.exception.ResourceNotFoundException;
import com.maurinem.qlinventorybackend.model.Schedule;
import com.maurinem.qlinventorybackend.repository.ScheduleRepository;
import com.maurinem.qlinventorybackend.service.ScheduleService;

@Service
public class ScheduleServiceImpl implements ScheduleService {

	private ScheduleRepository scheduleRepository;

	public ScheduleServiceImpl(ScheduleRepository scheduleRepository) {
		super();
		this.scheduleRepository = scheduleRepository;
	}

	@Override
	public Schedule saveSchedule(Schedule schedule) {
		return scheduleRepository.save(schedule);
	}

	@Override
	public List<Schedule> getAllSchedules() {
		return scheduleRepository.findAll();
	}

	@Override
	public Schedule getScheduleById(long id) {
		return scheduleRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Schedule", "ID", id));
	}

	@Override
	public Schedule updateSchedule(Schedule schedule, long id) {
		Schedule existingSchedule = getScheduleById(id);
		existingSchedule.setDestination(schedule.getDestination());
		existingSchedule.setStartDate(schedule.getStartDate());
		existingSchedule.setEndDate(schedule.getEndDate());
		existingSchedule.setItem(schedule.getItem());
		scheduleRepository.save(existingSchedule);
		return existingSchedule;
	}

	@Override
	public void deleteSchedule(long id) {
		scheduleRepository.deleteById(id);
	}

}
