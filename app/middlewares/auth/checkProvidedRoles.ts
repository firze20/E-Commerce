import { Request, Response, NextFunction } from "express";

import Role from "../../database/models/Role";

export const checkRolesExistance = async (req: Request, res: Response, next: NextFunction) => {
    const { roles } = req.body;
    if(!roles) {
       return next(); // If no roles were provided in req.body just return next
    }
    try {
        const findRoles = await Role.findAll({
            where: {
                name: roles,
            },
        });
        if (findRoles.length === 0) {
            return res.status(400).send({
                message: "Roles are not found",
            });
        }
        req.roles = findRoles;
        next();
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};