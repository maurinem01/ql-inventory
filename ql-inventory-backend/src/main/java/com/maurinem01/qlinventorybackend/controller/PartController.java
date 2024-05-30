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
import com.maurinem01.qlinventorybackend.model.Part;
import com.maurinem01.qlinventorybackend.service.PartService;

@RestController
@RequestMapping("/api/parts")
@CrossOrigin
public class PartController {
	
	private PartService partService;

	public PartController(PartService partService) {
		super();
		this.partService = partService;
	}
	
	@PostMapping
	public ResponseEntity<Part> savePart(@RequestBody Part part) {
		if (part.getIdentifier() == null || part.getIdentifier().isBlank()) {
			throw new MissingFieldException("Identifier");
		}
		return new ResponseEntity<Part>(partService.savePart(part), HttpStatus.CREATED);
	}
	
	@GetMapping
	public List<Part> getAllParts() {
		return partService.getAllParts();
	}
	
	// http://localhost:8080/api/parts/1
	@GetMapping("{id}")
	public ResponseEntity<Part> getPartById(@PathVariable("id") long id) {
		return new ResponseEntity<Part>(partService.getPartById(id), HttpStatus.OK);
	}
	
	// http://localhost:8080/api/parts/1
	@PutMapping("{id}")
	public ResponseEntity<Part> updatePart(@PathVariable("id") long id, @RequestBody Part part) {
		return new ResponseEntity<Part>(partService.updatePart(part, id), HttpStatus.OK);
	}
	
	// http://localhost:8080/api/parts/undelete-1
	@PutMapping("undelete-{id}")
	public ResponseEntity<Part> undeletePart(@PathVariable("id") long id) {
		return new ResponseEntity<Part>(partService.undeletePart(id), HttpStatus.OK);
	}

	/**
	 * This method replaces the classic {@code DELETE} method.
	 * @param partId
	 * @return
	 */
	// http://localhost:8080/api/parts/1
	@DeleteMapping("{id}")
	public ResponseEntity<String> deprecatePart(@PathVariable("id") long id) {
		// deprecate part from DB
		partService.deprecatePart(id);
		return new ResponseEntity<String>("Part deprecated successfully!", HttpStatus.OK);
	}
	
//	// http://localhost:8080/api/parts/1
//	@DeleteMapping("delete/{id}")
//	public ResponseEntity<String> deletePart(@PathVariable("id") long partId) {
//		// delete part from DB
//		partService.deletePart(partId);
//		return new ResponseEntity<String>("Part deleted successfully!", HttpStatus.OK);
//	}
	
}
