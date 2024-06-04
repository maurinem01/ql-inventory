package com.maurinem.qlinventorybackend.controller;

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

import com.maurinem.qlinventorybackend.exception.MissingFieldException;
import com.maurinem.qlinventorybackend.model.Item;
import com.maurinem.qlinventorybackend.service.ItemService;

@RestController
@RequestMapping("/api/items")
@CrossOrigin
public class ItemController {

	private ItemService itemService;

	public ItemController(ItemService itemService) {
		super();
		this.itemService = itemService;
	}

	@PostMapping
	public ResponseEntity<Item> saveItem(@RequestBody Item item) {
		if (item.getIdentifier() == null || item.getIdentifier().isBlank()) {
			throw new MissingFieldException("Identifier");
		}
		if (item.getPart() == null) {
			throw new MissingFieldException("Part");
		}
		return new ResponseEntity<Item>(itemService.saveItem(item), HttpStatus.CREATED);
	}

	@GetMapping
	public List<Item> getAllItems() {
		return itemService.getAllItems();
	}

	@GetMapping("{id}")
	public ResponseEntity<Item> getItemById(@PathVariable("id") long id) {
		return new ResponseEntity<Item>(itemService.getItemById(id), HttpStatus.OK);
	}

	@PutMapping("{id}")
	public ResponseEntity<Item> updateItem(@PathVariable("id") long id, @RequestBody Item item) {
		return new ResponseEntity<Item>(itemService.updateItem(item, id), HttpStatus.OK);
	}

	@DeleteMapping("{id}")
	public ResponseEntity<String> deprecateItem(@PathVariable("id") long id) {
		itemService.deleteItem(id);
		return new ResponseEntity<String>("Item deleted successfully!", HttpStatus.OK);
	}

	@PutMapping("{id}/add/{photoSetId}")
	public ResponseEntity<Item> addItemToPhotographySet(@PathVariable("id") long id,
			@PathVariable("photoSetId") long photoSetId) {
		return new ResponseEntity<Item>(itemService.addItemToPhotographySet(id, photoSetId), HttpStatus.OK);
	}

	@PutMapping("remove-{id}")
	public ResponseEntity<Item> removeItemFromPhotographySet(@PathVariable("id") long id) {
		return new ResponseEntity<Item>(itemService.removeItemFromPhotographySet(id), HttpStatus.OK);
	}
}
