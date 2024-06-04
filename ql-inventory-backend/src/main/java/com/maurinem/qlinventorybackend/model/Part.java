package com.maurinem.qlinventorybackend.model;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * This class represents an {@link Item} type/category.
 * <p>
 * Properties:
 * <ul>
 * <li>{@link #identifier}: {@code String}</li>
 * <li>{@link #deprecated}: {@code boolean}</li>
 * </ul>
 * 
 * @author Maurine
 *
 */
@Entity
@Table(name = "parts")
public class Part {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	/**
	 * Represents the unique part name (ex. toughbook, camera, etc).
	 */
	@Column(name = "identifier", nullable = false, unique = true)
	private String identifier;

	/**
	 * {@code Part} cannot be deleted. When obsolete, call
	 * {@code setDepracted(true)}.
	 */
	@Column(name = "deprecated")
	@ColumnDefault("0")
	private boolean deprecated;

	public Part() {
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

	public boolean isDeprecated() {
		return deprecated;
	}

	public void setDeprecated(boolean depracated) {
		this.deprecated = depracated;
	}

}