package com.maurinem.qlinventorybackend.service;

import java.util.List;

import com.maurinem.qlinventorybackend.model.Item;

public interface ItemService {

	Item saveItem(Item item);

	List<Item> getAllItems();

	Item getItemById(long id);

	Item updateItem(Item item, long id);

	void deleteItem(long id);

	Item addItemToPhotographySet(long itemId, long photoSetId);

	Item removeItemFromPhotographySet(long id);
}
