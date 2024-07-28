import { Request, Response } from "express";

import Item from "../../database/models/Item";

import { setAsync, deleteKeysByPattern } from "../../utils/redis";

import { itemKeys } from "../../config/cache/store.redis";

import format from "../../helpers/format";
import Category from "../../database/models/Category";
import Stock from "../../database/models/Stock";

const { formatItem } = format;

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

    // Query the newly created item with necessary includes
    const include = [
      {
        model: Stock,
        as: "stock",
        attributes: ["quantity"],
      },
      {
        model: Category,
        as: "categories",
        attributes: ["name"],
        through: { attributes: [] }, // To remove the join table attributes
      },
    ];

    const newItem = await Item.findOne({
      where: { id: item.id },
      include,
    }); // Find the newly created item

    // Clear the cache
    await deleteKeysByPattern("store:*");
    const itemForCache = formatItem(newItem!); // Format the item response
    // Set the new cache key
    const cacheKey = itemKeys.singleItem(newItem!.id);
    await setAsync(cacheKey, JSON.stringify({ item: itemForCache }), 3600); // Cache the response for an hour

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
    await deleteKeysByPattern("store:*"); // Clear all cache keys
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

    // Clear the cache
    await deleteKeysByPattern("store:*"); // Clear all cache keys for store

    // Query the newly created item with necessary includes
    const include = [
      {
        model: Stock,
        as: "stock",
        attributes: ["quantity"],
      },
      {
        model: Category,
        as: "categories",
        attributes: ["name"],
        through: { attributes: [] }, // To remove the join table attributes
      },
    ];
    
    const updatedItem = await Item.findOne({
      where: { id: item.id },
      include,
    }); // Find the updated item


    const itemForCache = formatItem(updatedItem!); // Format the item response

    // Set the new cache key
    const cacheKey = itemKeys.singleItem(item.id);
    await setAsync(cacheKey, JSON.stringify({ item: itemForCache }), 3600); // Cache the response for an hour

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
