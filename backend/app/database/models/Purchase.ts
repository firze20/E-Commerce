import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  ForeignKey,
  AutoIncrement,
  BelongsToMany,
  PrimaryKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User";
import Item from "./Item";
import Cart from "./Cart";
import PurchaseItem from "./PurchaseItem";
import sequelize from "../db.config";
import logger from "../../utils/logger";
import Stock from "./Stock";
import CartItem from "./CartItem";
import OutOfStockError from "../../errors/OutOfStockError";


/**
 * Represents an Purchase in the database.
 * @class
 * @extends {Model}
 */
@Table({
  tableName: "purchases",
})
class Purchase extends Model {
  /**
   * The unique identifier for the purchase.
   * @type {number}
   */
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  /**
   * The date when the purchase was made.
   * @type {Date}
   */
  @Column({
    type: DataType.DATE,
  })
  date!: Date;

  /**
   * The items purchased in this purchase.
   * @type {Item[]}
   */
  @BelongsToMany(() => Item, () => PurchaseItem)
  items!: Item[];

  /**
   * The foreign key for the user who made the purchase.
   * @type {number}
   */
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cartId!: number;

  @BelongsTo(() => Cart)
  cart!: Cart;

  @Column({
    type: DataType.DECIMAL(10, 2), // Adjust precision and scale as needed
    allowNull: false,
    defaultValue: 0.0,
  })
  totalPrice!: number; // Total price of the purchase

  // Create purchase
  /**
   * Creates a new purchase in the database.
   * @param cart
   */
  static async createPurchase(cart: Cart): Promise<void> {
    const transaction = await sequelize.transaction();
    try {
      // Get total price from the cart to calculate the price
      const totalPrice = await cart.getTotalPrice();
      // Gets all Items in the cart
      const totalItems = await cart.getCartItems();

      // Check if the cart is empty
      if (totalItems.length === 0) {
        throw new Error("Cannot create purchase. The cart is empty.");
      }

      // Create a new purchase
      const purchase = await Purchase.create(
        {
          date: new Date(),
          userId: cart.userId,
          cartId: cart.id,
          totalPrice,
        },
        { transaction }
      );

      for (const cartItem of totalItems) {
        // Check if there is item stock available

        const stock = await Stock.findOne({
          where: { itemId: cartItem.item.id },
          transaction,
          lock: transaction.LOCK.UPDATE, // Lock the row to prevent race conditions, lock any updates
        });

        if (!stock || stock.quantity < cartItem.quantity) {
          throw new OutOfStockError(`Not enough stock for item: ${cartItem.item.name}`);
        }

        await PurchaseItem.create(
          {
            purchaseId: purchase.id,
            itemId: cartItem.item.id,
            quantity: cartItem.quantity,
          },
          { transaction }
        );

        // Decrease the item stock quantity

        stock.quantity -= cartItem.quantity;
        await stock.save({ transaction });
      }

      // Empty the cart
      await CartItem.destroy({
        where: { cartId: cart.id },
        transaction,
      });

      await transaction.commit();
    } catch (error: any) {
      await transaction.rollback();
      logger.error("Error creating purchase: ", error);
      throw error;
    }
  }

  // Get Purchase Items
  /**
   * Gets the items in the purchase.
   * @returns {Promise<Item[]>}
   */
  async getPurchaseItems(): Promise<Item[]> {
    const items = (await this.$get("items")) as Item[];
    return items;
  }
}

export default Purchase;
