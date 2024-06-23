import { Request, Response } from "express";
import Category from "../../database/models/Category";

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name", "description"],
    });
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

const postCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
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
    await category.destroy();
    res.status(204).send({ message: "Category deleted"});
  } catch (error) {
    res.status(500).send({ message: "Failed to delete category" });
  }
};

export {
  getAllCategories as getAllCategoriesController,
  getSingleCategory as getSingleCategoryController,
  postCategory as postCategoryController,
  editCategory as editCategoryController,
  removeCategory as removeCategoryController,
};
