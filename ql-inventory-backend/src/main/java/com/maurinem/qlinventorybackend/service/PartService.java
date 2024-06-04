package com.maurinem.qlinventorybackend.service;

import java.util.List;

import com.maurinem.qlinventorybackend.model.Part;

/**
 * A {@link com.maurinem01.qlinventorybackend.model.Part Part} cannot be
 * deleted. If obsolete, set
 * {@link com.maurinem01.qlinventorybackend.model.Part#setDepracated(boolean)
 * Part.setDepracated()} to {@code true}.
 * 
 * @author Maurine
 *
 */
public interface PartService {

	Part savePart(Part part);

	List<Part> getAllParts();

	Part getPartById(long id);

	Part updatePart(Part part, long id);

	Part undeletePart(long id);

	void deprecatePart(long id);

	// void deletePart(long id);

}