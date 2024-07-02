import { Request, Response } from "express";
import { Op } from "sequelize";
import logger from "../../utils/logger";

import User from "../../database/models/User";
import Role from "../../database/models/Role";

import formatResponses from "../../helpers/format";
import Purchase from "../../database/models/Purchase";
import Item from "../../database/models/Item";

import { getAsync, setAsync, delAsync } from "../../utils/redis";

const { formatUsers, formatUser } = formatResponses;

const getAllUsers = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, name } = req.query;

  const cacheKey = `admin/users:${page}:${limit}:${name}`;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  const whereClause: any = {
    ...(name && { name: { [Op.like]: `%${name}` } }),
  };

  const offset = (Number(page) - 1) * Number(limit);

  try {
    // Check if the response is in the cache
    const cashedData = await getAsync(cacheKey);
    // If the response is in the cache, return it
    if(cashedData){
      logger.info("Retrieved users from cache");
      return res.status(200).json(JSON.parse(cashedData));
    };
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

    const response = {
      users: usersResponse,
      totalPages,
      currentPage: parsedPage,
      perPage: parsedLimit,
    };

    await setAsync(cacheKey, JSON.stringify(response), 3600); // Cache the response for an hour

    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send("Error getting all users");
  }
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cacheKey = `admin/users:${id}`; // Create a cache key based on the query params

  try {
    // Check if the response is in the cache

    const cashedData = await getAsync(cacheKey);

    // If the response is in the cache, return it 
    if(cashedData) {
      return res.status(200).json(JSON.parse(cashedData));
    };

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

    await setAsync(cacheKey, JSON.stringify(userResponse), 3600); // Cache the response for an hour

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

    // Invalidate the cache
    const cacheKey = `admin/users:${id}`;
    await delAsync(cacheKey);

    const formatedUserResponse = formatUser(updatedUser);

    await setAsync(cacheKey, JSON.stringify(formatedUserResponse), 3600); // Cache the response for an hour

    res.status(200).send({ message: "Role added to user", user: formatedUserResponse });
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

    // Invalidate the cache
    const cacheKey = `admin/users:${id}`;
    await delAsync(cacheKey);

    const formatedUserResponse = formatUser(updatedUser);

    await setAsync(cacheKey, JSON.stringify(formatedUserResponse), 3600); // Cache the response for an hour

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

    // Invalidate the cache
    const cacheKey = `admin/users:${id}`;
    await delAsync(cacheKey);

    res.status(200).send({ message: "User deleted" });
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
};

const getAllPurchases = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, username, minDate, maxDate } = req.query;

  const cacheKey = `admin/purchases:${page}:${limit}:${username}:${minDate}:${maxDate}`;

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
    // Check if the response is in the cache
    const cashedData = await getAsync(cacheKey);
    // If the response is in the cache, return it
    if(cashedData){
      logger.info("Retrieved purchases from cache");
      return res.status(200).json(JSON.parse(cashedData));
    };
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

    const response = {
      purchases: formattedPurchasesWithUsers,
      totalPages,
      currentPage: parsedPage,
      perPage: parsedLimit
    };

    await setAsync(cacheKey, JSON.stringify(response), 3600); // Cache the response for an hour

    res.status(200).send(response);
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
