import { Request, Response } from "express";
import logger from "../../utils/logger";
import Item from "../../database/models/Item";

const addStock = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { quantity } = req.body;

  try {
    const parsedQuantity = Number(quantity);

    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }

    const stock = await item.addStock(parsedQuantity);

    return res.status(200).send({ stock });
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
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }

    const stock = await item.removeStock(quantity);

    return res.status(200).send({ stock });
  } catch (error) {
    logger.error(`Error removing stock: ${error}`);
    return res
      .status(500)
      .send({ message: "An error occurred while removing stock" });
  }
};

export {
    addStock as addStockController,
    removeStock as removeStockController
}
