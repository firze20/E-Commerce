import { Request, Response } from "express";

import Item from "../../database/models/Item";

import { setAsync, delAsync } from "../../utils/redis";

/**
 * Controller to create a new item.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const createItem = async (req: Request, res: Response) => {
  const { name, description, price, image, categories } = req.body;

  try {
    const item = await Item.create({
      name,
      description,
      price,
      image,
    });

    if (categories) {
      await item.addCategory(categories);
    }

    // Clear the cache
    await delAsync("store");
    // Set the new cache key
    const cacheKey = `store/item:${item.id}`;
    await setAsync(cacheKey, JSON.stringify(item), 3600); // Cache the response for an hour

    res.status(201).send({
      message: "Item created!",
      item,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating item",
    });
  }
};
/**
 * Controller to delete an item by ID.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }
    await item.destroy();

    // Clear the cache
    await delAsync("store/items");
    res.status(200).send({
      message: "Item deleted!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting item",
    });
  }
};
/**
 * Controller to update an item by ID.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, image, categories } = req.body;

  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }

    await item.update({
      name,
      description,
      price,
      image,
    });

    if (categories) {
      await item.addCategory(categories);
    }

    res.status(200).send({
      message: "Item updated!",
      item,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error updating item",
    });
  }
};


export {
  createItem as createItemController,
  deleteItem as deleteItemController,
  updateItem as updateItemController,
};
