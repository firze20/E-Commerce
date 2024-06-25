import {Request, Response} from 'express';
import logger from '../../utils/logger';
import Cart from '../../database/models/Cart';
import Item from '../../database/models/Item';

import formatResponses from '../../helpers/format';

const { formatCartItems } = formatResponses;

const getMyCart = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne({
            where: {
                userId: req.user!.id
            },
            include: {
                model: Item,
                as: 'items',
                through: {
                    attributes: ['quantity']
                }
            }
        });

        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        const cartItems = await cart.getCartItems();

        const response = formatCartItems(cartItems);

        return res.status(200).send(response);
    } catch (error) {
        logger.error(`Error getting cart: ${error}`);
        return res.status(500).send({ message: "An error occurred while retrieving the cart" });
    }
};

const addItemToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const parsedQuantity = Number(quantity);

        const item = await Item.findByPk(id);

        if (!item) {
            return res.status(404).send({ message: "Item not found" });
        }

        const cart = await Cart.findOne({
            where: {
                userId: req.user!.id
            }
        });

        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        await cart.addItemToCart(item, quantity && parsedQuantity);

        return res.status(200).send({ message: "Item added to cart!" });
    } catch (error) {
        logger.error(`Error adding item to cart: ${error}`);
        return res.status(500).send({ message: "An error occurred while adding item to cart" });
    }
};

const removeItemFromCart = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const cart = await Cart.findOne({
            where: {
                userId: req.user!.id
            }
        });

        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        const cartItem = await cart.getItemFromCart(Number(id));

        if (!cartItem) {
            return res.status(404).send({ message: "Item not found in cart" });
        }

        await cart.removeItemFromCart(cartItem);

        return res.status(200).send({ message: "Item removed from cart" });    
    } catch (error) {
        logger.error(`Error removing item from cart: ${error}`);
        return res.status(500).send({ message: "An error occurred while removing item from cart" });
    }
};

const updateItemInCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {

        if(!quantity) {
            return res.status(400).send({ message: "Provide a quantity you want to update"})
        }

        const parsedQuantity = Number(quantity);

        const cart = await Cart.findOne({
            where: {
                userId: req.user!.id
            }
        });

        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        const cartItem = await cart.getItemFromCart(Number(id));

        if (!cartItem) {
            return res.status(404).send({ message: "Item not found in cart" });
        }

        

        await cart.updateItemInCart(cartItem, quantity && parsedQuantity);

        return res.status(200).send({ message: "Item updated in cart" });
    } catch (error) {
        logger.error(`Error updating item in cart: ${error}`);
        return res.status(500).send({ message: "An error occurred while updating item in cart" });
    }
};

const emptyCart = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne({
            where: {
                userId: req.user!.id
            }
        });

        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        await cart.emptyCart();

        return res.status(200).send({ message: "Cart emptied" });
    } catch (error) {
        logger.error(`Error emptying cart: ${error}`);
        return res.status(500).send({ message: "An error occurred while emptying cart" });
    }
};

export {
    getMyCart as getMyCartController,
    addItemToCart as addItemToCartController,
    removeItemFromCart as removeItemFromCartController,
    updateItemInCart as updateItemInCartController,
    emptyCart as emptyCartController
}