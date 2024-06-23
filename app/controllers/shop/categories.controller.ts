import { Request, Response } from 'express';
import Category from '../../database/models/Category';

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.findAll({ attributes: ['id', 'name', 'description']});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve categories' });
    }
};

export { getAllCategories as getAllCategoriesController };