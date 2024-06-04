package com.maurinem.qlinventorybackend.service;

import java.util.List;

import com.maurinem.qlinventorybackend.model.PhotographySet;

public interface PhotographySetService {

	PhotographySet savePhotographySet(PhotographySet photographySet);

	List<PhotographySet> getAllPhotographySets();

	// PhotographySet getPhotographySetById(long id);

	PhotographySet getPhotographySetById(long id);

	PhotographySet updatePhotographySet(PhotographySet photographySet, long id);

	void deletePhotographySet(long id);

}