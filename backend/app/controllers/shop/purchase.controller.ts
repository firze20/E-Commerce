import { Request, Response } from "express";
import { Op } from "sequelize";
import formatResponses from "../../helpers/format";

import Purchase from "../../database/models/Purchase";
import Cart from "../../database/models/Cart";
import Item from "../../database/models/Item";

import { delAsync, getAsync, setAsync, deleteKeysByPattern } from "../../utils/redis";
import logger from "../../utils/logger";

import { purchaseKeys, cartKeys } from "../../config/cache/store.redis";

import OutOfStockError from "../../errors/OutOfStockError";

const { formatPurchases } = formatResponses;

const makePurchase = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.user!.id,
      },
    });

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    await Purchase.createPurchase(cart);

    // Clear the user purchase cache
    const cacheKeyPurchase = `store/purchase:${req.user!.id}:*`;
    await deleteKeysByPattern(cacheKeyPurchase);
    // Clear cache Cart
    const cacheKeyCart = cartKeys.userCart(req.user!.id);
    await delAsync(cacheKeyCart);
    // Clear Item cache
    await deleteKeysByPattern("store/item:*");


    return res.status(201).send({ message: "Purchase completed" });
  } catch (error: any) {
    if (error instanceof OutOfStockError) {
      return res.status(409).send({ message: error.message });
    }
    res.status(500).send({ message: error.message });
  }
};

const getMyPurchases = async (req: Request, res: Response) => {
  // Need to add pagination to this endpoint
  const { page = 1, limit = 10, minDate, maxDate } = req.query;

  const cacheKey = purchaseKeys.userPurchases(
    req.user?.id!, 
    Number(page), 
    Number(limit), 
    minDate as string, 
    maxDate as string
  );

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  // Validate and parse dates
  let minimumDate: Date | undefined;
  let maximumDate: Date | undefined;

  if (minDate) {
    minimumDate = new Date(minDate as string);
    if (isNaN(minimumDate.getTime())) {
      return res.status(400).send({ message: "Invalid minDate" });
    }
  }

  if (maxDate) {
    maximumDate = new Date(maxDate as string);
    if (isNaN(maximumDate.getTime())) {
      return res.status(400).send({ message: "Invalid maxDate" });
    }
  }

  const whereClause: any = {
      userId: req.user!.id,
      ...(minimumDate && { createdAt: { [Op.gte]: new Date(minimumDate) } }),
      ...(maximumDate && { createdAt: { [Op.lte]: new Date(maximumDate) } })
  };

  const offset = (Number(page) - 1) * Number(limit);

  try {
    // Check if the response is in the cache
    const cacheData = await getAsync(cacheKey);
    // If the response is in the cache, return it
    if (cacheData) {
      logger.info("Retrieved purchases from cache");
      return res.status(200).json(JSON.parse(cacheData));
    }

    const { count: totalPurchases, rows: purchases } = await Purchase.findAndCountAll({
      where: whereClause,
      limit: parsedLimit,
      attributes: ["id", "totalPrice", "createdAt"],
      include: [
        {
          model: Item,
          as: "items",
          attributes: ["name", "price", "description", "image"],
        },
      ],
    offset,
    order: [["createdAt", "DESC"]],
    });

    const totalPages = Math.ceil(totalPurchases / parsedLimit);

    const formatResponse = formatPurchases(purchases);

    const response = {
      purchases: formatResponse,
      totalPages,
      currentPage: parsedPage,
      perPage: parsedLimit,
    };

    await setAsync(cacheKey, JSON.stringify(response), 60); // Cache the response for 60 seconds
    
    return res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export {
  makePurchase as makePurchaseController,
  getMyPurchases as getMyPurchasesController,
};
