import { Request, Response } from "express";
import Category from "../../database/models/Category";

import { getAsync, setAsync } from "../../utils/redis";

const getAllCategories = async (req: Request, res: Response) => {

  const cacheKey = `store/categories`;

  try {
    // Check if the response is in the cache
    const cashedData = await getAsync(cacheKey);
    // If the response is in the cache, return it
    if(cashedData) {
      return res.status(200).json(JSON.parse(cashedData));
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
    try {
        const category = await Category.findByPk(id);
        if (!category) {
        return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).send(category);
    } catch (error) {
        res.status(500).send({ message: "Failed to retrieve category" });
    }
};



export {
  getAllCategories as getAllCategoriesController,
  getSingleCategory as getSingleCategoryController
};
