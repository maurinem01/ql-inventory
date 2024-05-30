package com.maurinem01.qlinventorybackend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maurinem01.qlinventorybackend.exception.AttributeAlreadyExistsException;
import com.maurinem01.qlinventorybackend.exception.ResourceNotFoundException;
import com.maurinem01.qlinventorybackend.model.Item;
import com.maurinem01.qlinventorybackend.model.PhotographySet;
import com.maurinem01.qlinventorybackend.repository.ItemRepository;
import com.maurinem01.qlinventorybackend.repository.PhotographySetRepository;
import com.maurinem01.qlinventorybackend.service.ItemService;
import com.maurinem01.qlinventorybackend.service.PhotographySetService;

@Service
public class ItemServiceImpl implements ItemService {

	private ItemRepository itemRepository;
	
	@Autowired
	private PhotographySetRepository photographySetRepository;
	
	public ItemServiceImpl(ItemRepository itemRepository) {
		super();
		this.itemRepository = itemRepository;
	}

	@Override
	public Item saveItem(Item item) {
		return itemRepository.save(item);
	}

	@Override
	public List<Item> getAllItems() {
		return itemRepository.findAll();
	}

	@Override
	public Item getItemById(long id) {
		return itemRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Item", "ID", id));
	}
		
	/**
	 * 
	 */
	@Override
	public Item updateItem(Item item, long id) {
		Item existingItem = getItemById(id);
		existingItem.setIdentifier(item.getIdentifier());
		existingItem.setAlias(item.getAlias());
		existingItem.setPart(item.getPart());
		itemRepository.save(existingItem);
		return existingItem;
	}

	@Override
	public void deleteItem(long id) {
		itemRepository.deleteById(id);
	}
	
	@Override
	public Item addItemToPhotographySet(long itemId, long photoSetId) {
		PhotographySetService photographySetService = new PhotographySetServiceImpl(photographySetRepository);
		Item existingItem = getItemById(itemId);
		PhotographySet existingPhotographySet = photographySetService.getPhotographySetById(photoSetId);
		
		if (existingItem.getPhotographySet() == null) {
			existingItem.setPhotographySet(existingPhotographySet);
		} else {
			throw new AttributeAlreadyExistsException("Item", existingItem.getId() , "PhotographySet", existingPhotographySet.getId());
		}
		
		itemRepository.save(existingItem);
		return existingItem;
	}

	
	@Override
	public Item removeItemFromPhotographySet(long id) {
		Item existingItem = getItemById(id);
		existingItem.setPhotographySet(null);
		itemRepository.save(existingItem);
		return existingItem;
	}

}
