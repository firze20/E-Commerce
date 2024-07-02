import { Request, Response } from "express";
import { Op } from "sequelize";

import format from "../../helpers/format";

import Item from "../../database/models/Item";
import Stock from "../../database/models/Stock";
import Category from "../../database/models/Category";

import { getAsync, setAsync} from "../../utils/redis";

// Helper Format Item Response
const { formatItem } = format;
/**
 * Controller to get items from the store.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const getItemsFromStore = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, category, minimumPrice, maximumPrice, name} = req.query; // Get the query params from the request

  const cacheKey = `store:${page}:${limit}:${category}:${minimumPrice}:${maximumPrice}:${name}`; // Create a cache key based on the query params

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const parsedMinimumPrice = minimumPrice ? Number(minimumPrice) : undefined;
  const parsedMaximumPrice = maximumPrice ? Number(maximumPrice) : undefined;


  const whereClause: any = {
    ...(name && { name: { [Op.like]: `%${name}%` } }),
    ...(category && { categories: { [Op.contains]: [category] } }),
  };
  
  if (parsedMinimumPrice) {
    whereClause.price = { ...(whereClause.price || {}), [Op.gte]: parsedMinimumPrice };
  }
  
  if (parsedMaximumPrice) {
    whereClause.price = { ...(whereClause.price || {}), [Op.lte]: parsedMaximumPrice };
  }
  
  const offset = (Number(page) - 1) * Number(limit);

  try {
    // Check if the response is in the cache
    const cashedData = await getAsync(cacheKey);
    // If the response is in the cache, return it
    if(cashedData){
      return res.status(200).json(JSON.parse(cashedData));
    }

    const { count: totalItems, rows: items } = await Item.findAndCountAll({
      where: whereClause,
      limit: parsedLimit,
      offset,
      attributes: ["id", "name", "description", "price", "image"],
      order: [["id", "DESC"]],
      
    });

    const totalPages = Math.ceil(totalItems / parsedLimit);

    const responseData = {
      items,
      totalPages,
      currentPage: parsedPage,
      perPage: parsedLimit,
    };

    await setAsync(cacheKey, JSON.stringify(responseData), 60); // Cache the response for 60 seconds

    res.status(200).send(responseData);
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

  const cacheKey = `store/item:${id}`; // Create a cache key based on the item ID

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
    // Check if the response is in the cache

    const cashedData = await getAsync(cacheKey);
    // If the response is in the cache, return it
    if(cashedData){
      return res.status(200).json(JSON.parse(cashedData));
    }

    const item = await Item.findOne({
      where: { id },
      include,
    });

    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }

    const itemResponse = formatItem(item);

    const responseData = { item: itemResponse };

    await setAsync(cacheKey, JSON.stringify(responseData), 60); // Cache the response for 60 seconds

    return res.status(200).send(responseData);
  } catch (error) {
    return res.status(500).send({ message: "Error getting item" });
  }
};



export {
  getItemsFromStore as getItemsFromStoreController,
  getItem as getItemController,
};
