import { Request, Response } from "express";
import { Op } from "sequelize";

import User from "../../database/models/User";
import Role from "../../database/models/Role";

const getAllUsers = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, name} = req.query;

    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    const whereClause: any = {
        ...(name && { name: { [Op.like]: `%${name}`}})
    };

    const offset = (Number(page) - 1) * Number(limit);

    try {
        const {count: totalUsers, rows: users } = await User.findAndCountAll({
            where: whereClause,
            limit: parsedLimit,
            offset,
            attributes: ["id", "username", "email", "name", "age", "verified", "createdAt", "updatedAt"],
            include: {
                model: Role,
                as: "roles",
                attributes: ["name"],
                through: { attributes: []}
            }
        });

        const totalPages = Math.ceil(totalUsers / parsedLimit);

        res.status(200).send({
            users,
            totalPages,
            currentPage: parsedPage,
            perPage: parsedLimit
        });
    } catch (error: any) {
        res.status(500).send("Error getting all users")
    }
};

const getUser = async (req: Request, res: Response) => {

};

const addUserRole = async (req: Request, res: Response) => {

};

const removeUserRole = async (req: Request, res: Response) => {

}

const removeUser = async (req: Request, res: Response) => {

};

export {
    getAllUsers as getAllUsersController
}