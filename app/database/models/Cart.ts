import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  BelongsToMany,
  AutoIncrement,
  HasOne,
} from "sequelize-typescript";
import User from "./User";
import CartItem from "./CartItem";
import Purchase from "./Purchase";
import Item from "./Item";
import sequelize from "../db.config";

import logger from "../../utils/logger";
import { on } from "events";

/**
 * Represents a Cart in the database.
 * @class
 * @extends {Model}
 */
@Table({
  tableName: "carts",
})
class Cart extends Model {
  /**
   * The unique identifier for the Cart.
   * @type {number}
   */
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id!: number;

  /**
   * The ID of the User who owns the Cart.
   * @type {number}
   */
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  /**
   * The User who owns the Cart.
   * @type {User}
   */
  @BelongsTo(() => User, {
    onDelete: "CASCADE",
  })
  user!: User;

  /**
   * The items in the Cart.
   * @type {Item[]}
   */
  @BelongsToMany(() => Item, () => CartItem)
  items!: Item[];

  @HasOne(() => Purchase)
  purchase!: Purchase;

  // Add Items to Cart

  /**
   * Adds an item to the cart.
   * @param {Item} item - The item to add.
   * @param {number} [quantity=1] - The quantity of the item to add.
   * @returns {Promise<void>}
   */
  async addItemToCart(item: Item, quantity: number = 1): Promise<void> {
    // Begin a transaction
    const transaction = await sequelize.transaction();
    try {
      // Find or create CartItem

      // Find or create CartItem
      const [cartItem, created] = await CartItem.findOrCreate({
        where: { cartId: this.id, itemId: item.id },
        defaults: { quantity },
        transaction,
      });

      if (!created) {
        // Update CartItem quantity if it already exists
        cartItem.quantity += quantity;
        await cartItem.save({ transaction });
      }

      // Commmit transaction
      await transaction.commit();
    } catch (error: any) {
      // Rollback transaction
      await transaction.rollback();
      logger.error(`Error adding item to cart: ${error.message}`);
      throw new Error(`Failed to add item to cart: ${error.message}`);
    }
  }

  /**
   * Removes an item from the cart.
   * @param {Item} item - The Item to add
   * @param {number} [quantity=1] - The quantity of the item to remove.
   * @returns {Promise<void>}
   */
  /**
   * Removes an item from the cart.
   * @param {number} itemId - The ID of the item to remove.
   * @param {number} [quantity=1] - The quantity of the item to remove.
   * @returns {Promise<void>}
   */
  async removeItemFromCart(item: Item, quantity: number = 1): Promise<void> {
    // Begin a transaction
    const transaction = await sequelize.transaction();
    try {
      // Find CartItem
      const cartItem = await CartItem.findOne({
        where: { cartId: this.id, itemId: item.id },
        transaction,
      });

      if (!cartItem) {
        throw new Error("CartItem not found");
      }

      // Calculate new quantity
      const newQuantity = cartItem.quantity - quantity;

      if (newQuantity <= 0) {
        // Delete CartItem if quantity is 0 or less
        await cartItem.destroy({ transaction });
      } else {
        // Update CartItem quantity
        cartItem.quantity = newQuantity;
        await cartItem.save({ transaction });
      }

      // Commit transaction
      await transaction.commit();
    } catch (error: any) {
      // Rollback transaction
      await transaction.rollback();
      logger.error(`Error removing item from cart: ${error.message}`);
    }
  }

  /**
   * Updates the quantity of an item in the cart.
   * @param {Item} item - The Item to update.
   * @param {number} quantity - The new quantity of the item.
   * @returns {Promise<void>}
   */
  async updateItemInCart(item: Item, quantity: number): Promise<void> {
    // Begin a transaction
    const transaction = await sequelize.transaction();
    try {
      // Find CartItem
      const cartItem = await CartItem.findOne({
        where: { cartId: this.id, itemId: item.id },
        transaction,
      });

      if (!cartItem) {
        throw new Error("CartItem not found");
      }

      // Update CartItem quantity
      cartItem.quantity = quantity;
      await cartItem.save({ transaction });

      // Commit transaction
      await transaction.commit();
    } catch (error: any) {
      // Rollback transaction
      await transaction.rollback();
      logger.error(`Error updating item in cart: ${error.message}`);
    }}

  /**
   * Returns the quantity of items inside the cart
   * @returns {Promise<number>}
   */
  async getQuantityOfCart(): Promise<number> {
    try {
      const cartItems = await CartItem.findAll({
        where: { cartId: this.id },
      });

      let quantity = 0;

      for (const cartItem of cartItems) {
        quantity += cartItem.quantity;
      }

      return quantity;
    } catch (error: any) {
      logger.error(`Error fetching cart items: ${error.message}`);
      throw new Error("Failed to fetch cart items");
    }
  }

  /**
   * Returns the total price of the items in the cart.
   * @returns {Promise<number>}
   */

  async getTotalPrice(): Promise<number> {
    try {
      const cartItems = await CartItem.findAll({
        where: { cartId: this.id },
        include: Item,
      });

      let totalPrice = 0;

      for (const cartItem of cartItems) {
        totalPrice += cartItem.quantity * cartItem.item.price;
      }

      return totalPrice;
    } catch (error: any) {
      logger.error(`Error fetching cart items: ${error.message}`);
      throw new Error("Failed to fetch cart items");
    }
  }

  /**
   * Get cart Items
   * Returns the items in the cart.
   * @returns {Promise<Item[]>}
   */

  async getCartItems(): Promise<Item[]> {
    try {
      const cartItems = await CartItem.findAll({
        where: { cartId: this.id },
        include: Item,
      });

      return cartItems.map((cartItem) => cartItem.item);
    } catch (error: any) {
      logger.error(`Error fetching cart items: ${error.message}`);
      throw new Error("Failed to fetch cart items");
    }
  }

  /**
   * Get a single cart Item
   * Returns a single item in the cart if it exists.
   * @param {number} itemId - The ID of the item to get.
   * @returns {Promise<Item | null>} The item in the cart, or null if it does not exist.
   */
  async getItemFromCart(itemId: number): Promise<Item | null> {
    try {
      const cartItem = await CartItem.findOne({
        where: { cartId: this.id, itemId },
        include: Item,
      });

      if (!cartItem) {
        return null;
      }

      return cartItem.item;
    } catch (error: any) {
      logger.error(`Error fetching cart item: ${error.message}`);
      throw new Error("Failed to fetch cart item");
    }
  }

  /**
   * Empty the cart.
   * @returns {Promise<void>}
   */

  async emptyCart(): Promise<void> {
    // Begin a transaction
    const transaction = await sequelize.transaction();
    try {
      // Delete all CartItems
      await CartItem.destroy({
        where: { cartId: this.id },
        transaction,
      });

      // Commit transaction
      await transaction.commit();
    } catch (error: any) {
      // Rollback transaction
      await transaction.rollback();
      logger.error(`Error emptying cart: ${error.message}`);
    }
  }
}

export default Cart;
