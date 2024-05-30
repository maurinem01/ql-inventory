package com.maurinem01.qlinventorybackend.model;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * This class represents a Set of photography equipment.  Each set is identified by a number (not the same as the {@link PhotographySet#id id} used by the database).
 * @author Maurine
 *
 */
@Entity
@Table(name="sets")
public class PhotographySet {
	
	/**
	 * This number is used by the database as a unique identifier.  It is not the set number.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	/**
	 * This is the set number.  It is different from the database id.
	 */
	@Column(name = "identifier", nullable = false, unique = true)
	private String identifier;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "prestige")
	@ColumnDefault("0")
	private boolean prestige;
	
	public PhotographySet() {
		
	}
	
	public long getId() {
		return id;
	}

	public String getIdentifier() {
		return identifier;
	}

	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description != null ? description.toUpperCase() : null;
	}

	public boolean isPrestige() {
		return prestige;
	}

	public void setPrestige(boolean prestige) {
		this.prestige = prestige;
	}

	@Override
	public String toString() {
		return "PhotographySet [id=" + id + ", identifier=" + identifier + ", description=" + description
				+ ", prestige=" + prestige + "]";
	}

}
