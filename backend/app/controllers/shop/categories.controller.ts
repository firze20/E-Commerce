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



export {
  getAllCategories as getAllCategoriesController,
  getSingleCategory as getSingleCategoryController
};
