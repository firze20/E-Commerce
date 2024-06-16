import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  HasOne,
  AutoIncrement,
  ForeignKey,
  BelongsToMany,
  AfterCreate,
  AfterBulkCreate,
} from "sequelize-typescript";
import Stock from "./Stock";
import Category from "./Category";
import CategoryItem from "./CategoryItem";
import Cart from "./Cart";
import CartItem from "./CartItem";
import Purchase from "./Purchase";
import PurchaseItem from "./PurchaseItem";

import logger from "../../utils/logger";
/**
 * Represents an Item in the database.
 * @class
 * @extends {Model}
 */
@Table({
  tableName: "items",
  timestamps: true,
})
class Item extends Model {
  /**
   * The unique identifier for the item.
   * @type {number}
   */
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id!: number;

  /**
   * The name of the item.
   * @type {string}
   */
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  /**
   * The description of the item.
   * @type {string}
   */
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  /**
   * The price of the item.
   * @type {number}
   */
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  /**
   * The URL of the item's image.
   * @type {string}
   */
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image!: string;

  /**
   * The foreign key for the Stock associated with this item.
   * @type {number}
   */
  @ForeignKey(() => Stock)
  @Column({
    type: DataType.INTEGER,
  })
  stockId!: number;

  /**
   * The Stock instance associated with this item.
   * @type {Stock}
   */
  @HasOne(() => Stock)
  stock!: Stock;

  /**
   * The categories associated with this item.
   * @type {Category[]}
   */
  @BelongsToMany(() => Category, () => CategoryItem)
  categories!: Category[];

  /**
   * The carts associated with this item.
   * @type {Cart[]}
   */
  @BelongsToMany(() => Cart, () => CartItem)
  cart!: Cart[];

  /**
   * The purchases associated with this item.
   * @type {Purchase[]}
   */
  @BelongsToMany(() => Purchase, () => PurchaseItem)
  purchase!: Purchase[];

  /**
   * The date and time the item was created.
   * @type {Date}
   */
  @CreatedAt
  createdAt!: Date;

  /**
   * The date and time the item was last updated.
   * @type {Date}
   */
  @UpdatedAt
  updatedAt!: Date;

  /**
   * Hook executed after creating a single item. Sets the initial stock quantity to 1 for the item.
   * @static
   * @async
   * @param {Item} item - The newly created item instance.
   */
  @AfterCreate
  static async afterCreateSetQuantityToOne(item: Item) {
    try {
      const stock = await Stock.create({ quantity: 1, itemId: item.id });
      await item.$set("stock", stock);
      await stock.$set("item", item);
    } catch (error) {
      logger.error("Error setting stock quantity after item creation: ", error);
    }
  }

  /**
   * Hook executed after bulk creating items. Sets the initial stock quantity to 1 for each item.
   * @static
   * @async
   * @param {Item[]} items - The array of newly created item instances.
   */
  @AfterBulkCreate
  static async afterBulkCreateSetQuantityToOne(items: Item[]) {
    try {
      for (const item of items) {
        const stock = await Stock.create({ quantity: 1, itemId: item.id });
        await item.$set("stock", stock);
        await stock.$set("item", item);
      }
    } catch (error) {
      logger.error("Error setting stock quantity after bulk item creation: ", error);
    }
  }

  /**
   * Retrieves the current quantity of this item in stock.
   * @async
   * @returns {Promise<number>} The current quantity of this item in stock.
   */
  async howManyInStock(): Promise<number> {
    try {
      const stock = await this.$get("stock");
      return stock ? stock.quantity : 0;
    } catch (error) {
      logger.error("Error retrieving stock quantity: ", error);
      return 0;
    }
  }

  /**
   * Adds stock to this item.
   * @async
   * @param {number} quantity - The quantity of stock to add.
   * @throws {Error} If the quantity is less than or equal to 0.
   */
  async addStock(quantity: number): Promise<void> {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    try {
      const stock = (await this.$get("stock")) as Stock;
      if (stock) {
        stock.quantity += quantity;
        await stock.save();
      } else {
        const createStock = await Stock.create({ quantity });
        await this.$set("stock", createStock);
      }
    } catch (error) {
      logger.error("Error adding stock: ", error);
      throw new Error("Error adding stock");
    }
  }

  /**
   * Removes stock from this item.
   * @async
   * @param {number} quantity - The quantity of stock to remove.
   * @throws {Error} If the quantity is less than or equal to 0, if no stock is found, or if there isn't enough stock to remove.
   */
  async removeStock(quantity: number): Promise<void> {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    try {
      const stock = (await this.$get("stock")) as Stock;
      if (!stock) {
        throw new Error("Stock not found for this item");
      }

      if (stock.quantity < quantity) {
        throw new Error("Not enough stock to remove");
      }

      stock.quantity -= quantity;
      await stock.save();
    } catch (error) {
      logger.error("Error removing stock: ", error);
      throw new Error("Error removing stock");
    }
  }

  /**
   * Adds categories to this item.
   * @async
   * @param {string|string[]} categories - The name(s) of the categories to add.
   * @throws {Error} If one or more categories do not exist.
   */
  async addCategory(categories: string | string[]): Promise<void> {
    if (!Array.isArray(categories)) {
      categories = [categories];
    }

    try {
      const categorySearch = await Category.findAll({
        where: { name: categories },
      });

      if (categorySearch.length !== categories.length) {
        throw new Error("One or more categories do not exist");
      }

      await this.$add("categories", categorySearch);
    } catch (error) {
      logger.error("Error adding category: ", error);
      throw new Error("Error adding category");
    }
  }

  /**
   * Removes categories from this item.
   * @async
   * @param {string|string[]} categories - The name(s) of the categories to remove.
   * @throws {Error} If one or more categories do not exist.
   */
  async removeCategory(categories: string | string[]): Promise<void> {
    if (!Array.isArray(categories)) {
      categories = [categories];
    }

    try {
      const categorySearch = await Category.findAll({
        where: { name: categories },
      });

      if (categorySearch.length !== categories.length) {
        throw new Error("One or more categories do not exist");
      }

      await this.$remove("categories", categorySearch);
    } catch (error) {
      logger.error("Error removing category: ", error);
      throw new Error("Error removing category");
    }
  }
}

export default Item;