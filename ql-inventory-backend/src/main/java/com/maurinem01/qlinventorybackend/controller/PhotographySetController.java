package com.maurinem01.qlinventorybackend.controller;

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

import com.maurinem01.qlinventorybackend.exception.MissingFieldException;
import com.maurinem01.qlinventorybackend.model.PhotographySet;
import com.maurinem01.qlinventorybackend.service.PhotographySetService;

@RestController
@RequestMapping("/api/sets")
@CrossOrigin
public class PhotographySetController {

	private PhotographySetService photographySetService;

	public PhotographySetController(PhotographySetService photographySetService) {
		super();
		this.photographySetService = photographySetService;
	}
	
	@PostMapping
	public ResponseEntity<PhotographySet> savePhotographySet(@RequestBody PhotographySet photographySet) {
		if (photographySet.getIdentifier() == null) {
			throw new MissingFieldException("Part Identifier");
		}
		return new ResponseEntity<PhotographySet>(photographySetService.savePhotographySet(photographySet), HttpStatus.CREATED);
	}
	
	@GetMapping
	public List<PhotographySet> getAllPhotographySets() {
		return photographySetService.getAllPhotographySets();
	}
	
	@GetMapping("{id}")
	public ResponseEntity<PhotographySet> getPhotographySetById(@PathVariable("id") long id) {
		return new ResponseEntity<PhotographySet>(photographySetService.getPhotographySetById(id), HttpStatus.OK);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<PhotographySet> updatePhotographySet(@PathVariable("id") long id, @RequestBody PhotographySet photographySet) {
		return new ResponseEntity<PhotographySet>(photographySetService.updatePhotographySet(photographySet, id), HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<String> deletePhotographySet(@PathVariable("id") long id) {
		photographySetService.deletePhotographySet(id);
		return new ResponseEntity<String>("PhotographySet deleted successfully!", HttpStatus.OK);
	}	
}
