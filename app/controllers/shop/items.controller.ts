import { Request, Response } from "express";

import Item from "../../database/models/Item";
import Stock from "../../database/models/Stock";
import Category from "../../database/models/Category";

const getItemsFromStore = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, category } = req.query; // Get the query params

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  const whereClause: any = {};

  const include: any = [
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

  if (category) {
    include.push({
      model: Category,
      as: "categories",
      where: {
        name: category,
      },
      attributes: [],
    });
  }

  const offset = (Number(page) - 1) * Number(limit);

  try {
    const { count: totalItems, rows: items } = await Item.findAndCountAll({
      where: whereClause,
      include,
      limit: parsedLimit,
      offset,
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

export {
  getItemsFromStore as getItemsFromStoreController,
  createItem as createItemController,
};
