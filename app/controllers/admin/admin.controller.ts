import { Request, Response } from "express";
import { Op } from "sequelize";

import User from "../../database/models/User";
import Role from "../../database/models/Role";

import formatResponses from "../../helpers/format";

const { formatUsers, formatUser } = formatResponses;

const getAllUsers = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, name } = req.query;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  const whereClause: any = {
    ...(name && { name: { [Op.like]: `%${name}` } }),
  };

  const offset = (Number(page) - 1) * Number(limit);

  try {
    const { count: totalUsers, rows: users } = await User.findAndCountAll({
      where: whereClause,
      limit: parsedLimit,
      offset,
      attributes: [
        "id",
        "username",
        "email",
        "name",
        "age",
        "verified",
        "createdAt",
        "updatedAt",
      ],
      include: {
        model: Role,
        as: "roles",
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    const totalPages = Math.ceil(totalUsers / parsedLimit);

    const usersResponse = formatUsers(users);

    res.status(200).send({
      usersResponse,
      totalPages,
      currentPage: parsedPage,
      perPage: parsedLimit,
    });
  } catch (error: any) {
    res.status(500).send("Error getting all users");
  }
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: [
        "id",
        "username",
        "email",
        "name",
        "age",
        "verified",
        "createdAt",
        "updatedAt",
      ],
      include: {
        model: Role,
        as: "roles",
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User doesn't exist" });
    }

    const userResponse = formatUser(user);

    res.status(200).send(userResponse);
  } catch (error) {
    res.status(500).send("Error getting user");
  }
};

const addUserRoles = async (req: Request, res: Response) => {
  const { id } = req.params;
  const roles = req.roles;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: "User doesn't exist" });
    }

    const roleNames = roles!.map((role: any) => role.name);

    await user.addRoles(roleNames);

    res.status(200).send({ message: "Role added to user" });
  } catch (error) {
    res.status(500).send("Error adding role to user");
  }
};

const removeUserRoles = async (req: Request, res: Response) => {
  const { id } = req.params;
  const roles = req.roles;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: "User doesn't exist" });
    }

    const roleNames = roles!.map((role: any) => role.name);

    await user.removeRoles(roleNames);

    res.status(200).send({ message: "Role removed from user" });
  } catch (error) {
    res.status(500).send("Error removing role from user");
  }
};

const removeUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: "User doesn't exist" });
    }

    await user.destroy();

    res.status(200).send({ message: "User deleted" });
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
};

export {
  getAllUsers as getAllUsersController,
  getUser as getUserController,
  addUserRoles as addUserRolesController,
  removeUserRoles as removeUserRolesController,
  removeUser as removeUserController,
};
