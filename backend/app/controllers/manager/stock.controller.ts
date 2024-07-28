import { Request, Response } from "express";
import logger from "../../utils/logger";
import Item from "../../database/models/Item";

import { itemKeys } from "../../config/cache/store.redis";

import { delAsync } from "../../utils/redis";

import formatResponses from "../../helpers/format";

const { formatItem } = formatResponses;

const addStock = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { quantity } = req.body;

  try {
    const parsedQuantity = Number(quantity);

    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }

    const updateItemStock = await item.addStock(quantity && parsedQuantity);

    if (!updateItemStock) {
      return res
        .status(500)
        .send({ message: "An error occurred while adding stock" });
    }

    // Clear cache for the item
    await delAsync(itemKeys.singleItem(updateItemStock.id));

    return res
      .status(200)
      .send({
        message: "Successfully increased item stock",
        item: formatItem(updateItemStock),
      });
  } catch (error) {
    logger.error(`Error adding stock: ${error}`);
    return res
      .status(500)
      .send({ message: "An error occurred while adding stock" });
  }
};

const removeStock = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { quantity } = req.body;

  const item = await Item.findByPk(id);

  try {
    const parsedQuantity = Number(quantity);

    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }

    const updateItemStock = await item.removeStock(quantity && parsedQuantity);

    if (!updateItemStock) {
      return res
        .status(500)
        .send({ message: "An error occurred while removing stock" });
    }

    // Clear cache for the item
    await delAsync(itemKeys.singleItem(updateItemStock.id));

    return res
      .status(200)
      .send({
        message: "Successfully decreased item stock",
        item: formatItem(updateItemStock),
      });
  } catch (error) {
    logger.error(`Error removing stock: ${error}`);
    return res
      .status(500)
      .send({ message: "An error occurred while removing stock" });
  }
};

export { addStock as addStockController, removeStock as removeStockController };
