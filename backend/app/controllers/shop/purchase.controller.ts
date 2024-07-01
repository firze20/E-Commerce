import { Request, Response } from "express";
import { Op } from "sequelize";
import formatResponses from "../../helpers/format";

import Purchase from "../../database/models/Purchase";
import Cart from "../../database/models/Cart";
import Item from "../../database/models/Item";

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
    return res.status(201).send({ message: "Purchase completed" });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

const getMyPurchases = async (req: Request, res: Response) => {
  // Need to add pagination to this endpoint
  const { page = 1, limit = 10, minDate, maxDate } = req.query;

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

  try {
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
    order: [["createdAt", "DESC"]],
    });

    const totalPages = Math.ceil(totalPurchases / parsedLimit);

    const formatResponse = formatPurchases(purchases);

    return res.status(200).send({ purchases: formatResponse, totalPages, currentPage: parsedPage, perPage: parsedLimit });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export {
  makePurchase as makePurchaseController,
  getMyPurchases as getMyPurchasesController,
};
