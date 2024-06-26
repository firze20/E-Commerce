import { Request, Response } from "express";
import { Op } from "sequelize";

import User from "../../database/models/User";
import Role from "../../database/models/Role";

import formatResponses from "../../helpers/format";
import Purchase from "../../database/models/Purchase";
import Item from "../../database/models/Item";

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
      attributes: {
        exclude: ["password"]
      },
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
      users: usersResponse,
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
      attributes: {
        exclude: ["password"]
      },
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

    if(!roles) return res.status(400).send({ message: "Roles are not provided" });

    const updatedUser = await user.addRoles(roles);

    res.status(200).send({ message: "Role added to user", user: formatUser(updatedUser) });
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

    if(!roles) return res.status(400).send({ message: "Roles are not provided" });

    const updatedUser = await user.removeRoles(roles);

    res.status(200).send({ message: "Role removed from user", user: formatUser(updatedUser) });
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

const getAllPurchases = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, username, minDate, maxDate } = req.query;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  const offset = (parsedPage - 1) * parsedLimit;

  // Validate and parse dates
  let minimumDate: Date | undefined;
  let maximumDate: Date | undefined;

  if (minDate) {
    minimumDate = new Date(minDate as string);
    if (isNaN(minimumDate.getTime())) {
      return res.status(400).send({ message: "Invalid date" });
    }
  }

  if (maxDate) {
    maximumDate = new Date(maxDate as string);
    if (isNaN(maximumDate.getTime())) {
      return res.status(400).send({ message: "Invalid date" });
    }
  }

  const whereClause: any = {
    ...(minimumDate && { createdAt: { [Op.gte]: minimumDate } }),
    ...(maximumDate && { createdAt: { [Op.lte]: maximumDate } }),
  };

  try {
    const { count: totalPurchases, rows: purchases } = await Purchase.findAndCountAll({
      where: whereClause,
      limit: parsedLimit,
      offset,
      include: [
        {
          model: Item,
          as: "items",
          attributes: ["name", "price", "description", "image"],
        },
        {
          model: User,
          as: "user",
          attributes: {
            include: ["username", "email", "name"]
          },
          where: username ? { username: { [Op.like]: `%${username}%` } } : undefined,
        }
      ],
      order: [["createdAt", "DESC"]],
    });

    const totalPages = Math.ceil(totalPurchases / parsedLimit);

    const formattedPurchases = formatResponses.formatPurchases(purchases);

    const formattedUsers = formatResponses.formatUsers(purchases.map((purchase) => purchase.user));

    const formattedPurchasesWithUsers = formattedPurchases.map((purchase, index) => {
      return {
        ...purchase,
        user: formattedUsers[index],
      };
    });

    res.status(200).send({
      purchases: formattedPurchasesWithUsers,
      totalPages,
      currentPage: parsedPage,
      perPage: parsedLimit,
    });
  } catch (error: any) {
    console.error("Error getting all purchases:", error); // Log the error for debugging
    res.status(500).send({ message: "Error getting all purchases" });
  }
};


export {
  getAllUsers as getAllUsersController,
  getUser as getUserController,
  addUserRoles as addUserRolesController,
  removeUserRoles as removeUserRolesController,
  removeUser as removeUserController,
  getAllPurchases as getAllPurchasesController,
};
