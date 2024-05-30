package com.maurinem01.qlinventorybackend.model;

import java.time.LocalDate;
//import java.util.HashSet;
//import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name="schedules")
public class Schedule {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "destination", nullable = false)
	private String destination;
	
	@Column(name = "startDate", nullable = false)
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate startDate;

	@Column(name = "endDate", nullable = false)
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate endDate;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "item_id")
	private Item item;
	
	public Schedule() {
	}
	
	public long getId() {
		return id;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination.toUpperCase();
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
		item.addToSchedules(this);
	}

	@Override
	public String toString() {
		return "Schedule [id=" + id + ", destination=" + destination + ", startDate=" + startDate + ", endDate="
				+ endDate + ", item id=" + item.getId() + "]";
	}
	
}
