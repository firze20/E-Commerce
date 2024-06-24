import { Request, Response } from "express";

import Purchase from "../../database/models/Purchase";
import Cart from "../../database/models/Cart";

const makePurchase = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne({
            where: {
                userId: req.user!.id
            }
        });

        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        await Purchase.createPurchase(cart);
        return res.status(201).send({ message: "Purchase completed" });
    } catch (error: any) {
        res.status(500).send({ message: `Error making a purchase: ${error.message}`})
    }
}

export {
    makePurchase as makePurchaseController
}