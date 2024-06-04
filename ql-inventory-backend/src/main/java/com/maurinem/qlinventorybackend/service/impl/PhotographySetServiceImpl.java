package com.maurinem.qlinventorybackend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.maurinem.qlinventorybackend.exception.ResourceNotFoundException;
import com.maurinem.qlinventorybackend.model.PhotographySet;
import com.maurinem.qlinventorybackend.repository.PhotographySetRepository;
import com.maurinem.qlinventorybackend.service.PhotographySetService;

@Service
public class PhotographySetServiceImpl implements PhotographySetService {

	private PhotographySetRepository photographySetRepository;

	public PhotographySetServiceImpl(PhotographySetRepository photographySetRepository) {
		super();
		this.photographySetRepository = photographySetRepository;
	}

	@Override
	public PhotographySet savePhotographySet(PhotographySet photographySet) {
		return photographySetRepository.save(photographySet);
	}

	@Override
	public List<PhotographySet> getAllPhotographySets() {
		return photographySetRepository.findAll();
	}

	/**
	 * Rewrite this more elegantly
	 */
	@Override
	public PhotographySet getPhotographySetById(long id) {
		return photographySetRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("PhotograhySet", "ID", id));
	}

	@Override
	public PhotographySet updatePhotographySet(PhotographySet photographySet, long id) {
		PhotographySet existingPhotographySet = getPhotographySetById(id);

		existingPhotographySet.setIdentifier(photographySet.getIdentifier());
		existingPhotographySet.setDescription(photographySet.getDescription());
		existingPhotographySet.setPrestige(photographySet.isPrestige());
		photographySetRepository.save(existingPhotographySet);

		return existingPhotographySet;
	}

	@Override
	public void deletePhotographySet(long id) {
		PhotographySet existingPhotographySet = getPhotographySetById(id);
		photographySetRepository.deleteById(existingPhotographySet.getId());
	}

}
