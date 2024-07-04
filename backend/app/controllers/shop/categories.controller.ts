import { Request, Response } from "express";
import Category from "../../database/models/Category";
import logger from "../../utils/logger";
import { getAsync, setAsync } from "../../utils/redis";
import { categoryKeys } from "../../config/cache/store.redis";

const getAllCategories = async (req: Request, res: Response) => {
  const cacheKey = categoryKeys.allCategories;

  try {
    // Check if the response is in the cache
    const cacheData = await getAsync(cacheKey);
    // If the response is in the cache, return it
    if (cacheData) {
      logger.info("Retrieved categories from cache");
      return res.status(200).json(JSON.parse(cacheData));
    }
    const categories = await Category.findAll({
      attributes: ["id", "name", "description"],
    });

    await setAsync(cacheKey, JSON.stringify(categories), 3600); // Cache the response for an hour

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve categories" });
  }
};

const getSingleCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cacheKey = categoryKeys.singleCategory(id);

  try {
    // Check if the response is in the cache
    const cacheData = await getAsync(cacheKey);
    // If the response is in the cache, return it
    if (cacheData) {
      logger.info("Retrieved category from cache");
      return res.status(200).json(JSON.parse(cacheData));
    }

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await setAsync(cacheKey, JSON.stringify(category), 3600); // Cache the response for an hour
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send({ message: "Failed to retrieve category" });
  }
};

export {
  getAllCategories as getAllCategoriesController,
  getSingleCategory as getSingleCategoryController,
};
