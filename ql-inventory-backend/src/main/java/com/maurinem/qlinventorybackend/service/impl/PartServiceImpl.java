package com.maurinem.qlinventorybackend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.maurinem.qlinventorybackend.exception.ResourceNotFoundException;
import com.maurinem.qlinventorybackend.model.Part;
import com.maurinem.qlinventorybackend.repository.PartRepository;
import com.maurinem.qlinventorybackend.service.PartService;

@Service
public class PartServiceImpl implements PartService {

	private PartRepository partRepository;

	public PartServiceImpl(PartRepository partRepository) {
		super();
		this.partRepository = partRepository;
	}

	@Override
	public Part savePart(Part part) {
		return partRepository.save(part);
	}

	@Override
	public List<Part> getAllParts() {
		return partRepository.findAll();
	}

	@Override
	public Part getPartById(long id) {

		// Optional<Part> part = partRepository.findById(id);

		// if (part.isPresent()) {
		// return part.get();
		// } else {
		// throw new ResourceNotFoundException("Part", "ID", id);
		// }

		return partRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Part", "ID", id));
	}

	/**
	 * The only update allowable is to the
	 * {@link com.maurinem01.qlinventorybackend.model.Part#identifier identifier}
	 * property. Any
	 * {@link com.maurinem01.qlinventorybackend.model.Item Items} associated with
	 * the {@link com.maurinem01.qlinventorybackend.model.Part Part}
	 * parameter passed to this method will remain linked.
	 */
	@Override
	public Part updatePart(Part part, long id) {

		// check if part ID exists
		Part existingPart = getPartById(id);

		// update existing part identifier to parameter part identifier
		existingPart.setIdentifier(part.getIdentifier());

		// save existing part to DB
		partRepository.save(existingPart);

		return existingPart;
	}

	public Part undeletePart(long id) {

		// check if part ID exists
		Part existingPart = getPartById(id);

		existingPart.setDeprecated(false);

		// save existing part to DB
		partRepository.save(existingPart);

		return existingPart;

	}

	@Override
	public void deprecatePart(long id) {
		Part existingPart = getPartById(id);
		existingPart.setDeprecated(true);
		partRepository.save(existingPart);
	}

	// @Override
	// public void deletePart(long id) {
	//
	// // check if part ID exists
	// getPartById(id);
	//
	// partRepository.deleteById(id);
	// }

}
