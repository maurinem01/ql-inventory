package com.maurinem.qlinventorybackend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maurinem.qlinventorybackend.exception.MissingFieldException;
import com.maurinem.qlinventorybackend.model.Schedule;
import com.maurinem.qlinventorybackend.service.ScheduleService;

@RestController
@RequestMapping("/api/schedules")
@CrossOrigin
public class ScheduleController {

	private ScheduleService scheduleService;

	public ScheduleController(ScheduleService scheduleService) {
		super();
		this.scheduleService = scheduleService;
	}

	@PostMapping
	public ResponseEntity<Schedule> saveSchedule(@RequestBody Schedule schedule) {
		System.out.println(schedule.toString());
		if (schedule.getDestination() == null || schedule.getDestination().isBlank()) {
			throw new MissingFieldException("Destination");
		}
		if (schedule.getStartDate() == null) {
			throw new MissingFieldException("Start Date");
		}
		if (schedule.getEndDate() == null) {
			throw new MissingFieldException("End Date");
		}
		if (schedule.getItem() == null) {
			throw new MissingFieldException("Item");
		}
		return new ResponseEntity<Schedule>(scheduleService.saveSchedule(schedule), HttpStatus.CREATED);
	}

	@GetMapping
	public List<Schedule> getAllSchedules() {
		return scheduleService.getAllSchedules();
	}

	@GetMapping("{id}")
	public ResponseEntity<Schedule> getScheduleById(@PathVariable("id") long id) {
		return new ResponseEntity<Schedule>(scheduleService.getScheduleById(id), HttpStatus.OK);
	}

	@PutMapping("{id}")
	public ResponseEntity<Schedule> updateSchedule(@PathVariable("id") long id, @RequestBody Schedule schedule) {
		return new ResponseEntity<Schedule>(scheduleService.updateSchedule(schedule, id), HttpStatus.OK);
	}

	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteSchedule(@PathVariable("id") long id) {
		scheduleService.deleteSchedule(id);
		return new ResponseEntity<String>("Schedule deleted successfully!", HttpStatus.OK);
	}
}
