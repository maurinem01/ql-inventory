package com.maurinem.qlinventorybackend.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 * This class represents an equipment/item. Each {@code Item} is categorized to
 * a {@link Part} and can be assigned to a {@link PhotographySet}.
 * 
 * @author Maurine
 *
 */
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name = "items")
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	/**
	 * Represents a serial number or license plate. This property is only relevant
	 * for serialized items and is {@code null} for non-serialized items.
	 */
	@Column(name = "identifier", unique = true)
	private String identifier;

	/**
	 * Sometimes, the vans have "names". This property represents any quirky aliases
	 * given to equipment.
	 */
	@Column(name = "alias")
	private String alias;

	@ManyToOne(optional = false, cascade = CascadeType.MERGE)
	private Part part;

	@ManyToOne(cascade = CascadeType.PERSIST)
	private PhotographySet photographySet;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "item")
	@JsonManagedReference
	private Set<Schedule> schedules;

	public Item() {
		schedules = new HashSet<Schedule>();
	}

	public long getId() {
		return id;
	}

	public String getIdentifier() {
		return identifier;
	}

	public void setIdentifier(String identifier) {
		this.identifier = identifier.toUpperCase();
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias != null ? alias.toUpperCase() : "";
	}

	public Part getPart() {
		return part;
	}

	public void setPart(Part part) {
		this.part = part;
	}

	public PhotographySet getPhotographySet() {
		return photographySet;
	}

	public void addToSchedules(Schedule schedule) {
		schedules.add(schedule);
	}

	public Set<Schedule> getSchedules() {
		return schedules;
	}

	public void setPhotographySet(PhotographySet photographySet) {
		this.photographySet = photographySet;
	}

	@Override
	public String toString() {
		return "Item [id=" + id + ", identifier=" + identifier + ", alias=" + alias + ", part=" + part
				+ ", photographySet=" + photographySet + ", schedules=" + schedules + "]";
	}

}
