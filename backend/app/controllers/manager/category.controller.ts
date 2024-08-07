import { Request, Response } from "express";
import Category from "../../database/models/Category";
import { setAsync, delAsync } from "../../utils/redis";

import { categoryKeys } from "../../config/cache/store.redis";

const postCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });

    // Clear the cache
    await delAsync(categoryKeys.allCategories);

    // New cache key
    const cacheKey = (categoryKeys.singleCategory(category.id)); 
    await setAsync(cacheKey, JSON.stringify(category), 3600); // Cache the response for an hour

    res.status(201).send({ message: "Category created", category });
  } catch (error) {
    res.status(500).send({ message: "Failed to create category" });
  }
};

const editCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { name, description } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = name ? name : category.name;
    category.description = description ? description : category.description;
    await category.save();

    // Clear the cache for all categories and the specific category
    await delAsync(categoryKeys.allCategories);
    const cacheKey = categoryKeys.singleCategory(id);
    await delAsync(cacheKey);

    // Set the new cache key
    await setAsync(cacheKey, JSON.stringify(category), 3600); // Cache the response for an hour

    res.status(200).send({ message: "Category updated", category});
  } catch (error) {
    res.status(500).send({ message: "Failed to update category" });
  }
};

const removeCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    // Clear the cache
    await delAsync(categoryKeys.allCategories);
    const cacheKey = categoryKeys.singleCategory(id);
    await delAsync(cacheKey);

    await category.destroy();
    res.status(204).send({ message: "Category deleted"});
  } catch (error) {
    res.status(500).send({ message: "Failed to delete category" });
  }
};

export {
  postCategory as postCategoryController,
  editCategory as editCategoryController,
  removeCategory as removeCategoryController,
};
