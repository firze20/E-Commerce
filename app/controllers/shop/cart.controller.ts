import {Request, Response} from 'express';
import logger from '../../utils/logger';
import Cart from '../../database/models/Cart';

const getMyCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.user!;
        const cart = await Cart.findOne({
            where: {
                userId: id
            }
        });

        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        const cartItems = await cart.getCartItems();
        const totalPrice = await cart.getTotalPrice();

        const items = cartItems.map((cartItem) => {
            return {
                id: cartItem.id,
                name: cartItem.name,
                price: cartItem.price,
                quantity: cartItem.stock.quantity,
            };
        });

        return res.status(200).send({ cart: items, totalPrice: totalPrice });
    } catch (error) {
        logger.error(`Error getting cart: ${error}`);
        return res.status(500).send({ message: "An error occurred while retrieving the cart" });
    }
};

const addItemToCart = async (req: Request, res: Response) => {};

const removeItemFromCart = async (req: Request, res: Response) => {};

const updateItemInCart = async (req: Request, res: Response) => {};

export {
    getMyCart as getMyCartController
}