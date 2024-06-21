import { Request, Response } from "express";
import { Op } from "sequelize";

import format from "../../helpers/format";

import Item from "../../database/models/Item";
import Stock from "../../database/models/Stock";
import Category from "../../database/models/Category";

// Helper Format Item Response
const { formatItem } = format;
/**
 * Controller to get items from the store.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const getItemsFromStore = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, category, minimumPrice, maximumPrice, name} = req.query; // Get the query params from the request

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const parsedMinimumPrice = minimumPrice ? Number(minimumPrice) : undefined;
  const parsedMaximumPrice = maximumPrice ? Number(maximumPrice) : undefined;


  const whereClause: any = {};
  
  if (name) {
    whereClause.name = { [Op.like]: `%${name}%` };
  }

  if(category) {
    whereClause.categories = { [Op.contains]: [category] };
  }

  if (parsedMinimumPrice) {
    whereClause.price = { [Op.gte]: minimumPrice};
  }

  if (parsedMaximumPrice) {
    whereClause.price = { [Op.lte]: maximumPrice};
  }

  const offset = (Number(page) - 1) * Number(limit);

  try {
    const { count: totalItems, rows: items } = await Item.findAndCountAll({
      where: whereClause,
      limit: parsedLimit,
      offset,
      attributes: ["id", "name", "description", "price", "image"],
      order: [["id", "DESC"]],
      
    });

    const totalPages = Math.ceil(totalItems / parsedLimit);

    res.status(200).send({
      items,
      totalPages,
      currentPage: parsedPage,
      perPage: parsedLimit,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting items",
    });
  }
};
/**
 * Controller to get a single item by ID.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const getItem = async (req: Request, res: Response) => {
  const { id } = req.params;

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

  try {
    const item = await Item.findOne({
      where: { id },
      include,
    });

    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }

    const itemResponse = formatItem(item);
    return res.status(200).send({ item: itemResponse });
  } catch (error) {
    return res.status(500).send({ message: "Error getting item" });
  }
};
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
  getItemsFromStore as getItemsFromStoreController,
  getItem as getItemController,
  createItem as createItemController,
  deleteItem as deleteItemController,
  updateItem as updateItemController,
};
