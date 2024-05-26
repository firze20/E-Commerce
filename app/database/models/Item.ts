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
} from "sequelize-typescript";
import Stock from "./Stock";
import Category from "./Category";
import CategoryItem from "./CategoryItem";
import Cart from "./Cart";
import CartItem from "./CartItem";
import Purchase from "./Purchase";
import PurchaseItem from "./PurchaseItem";

import logger from "../../utils/logger";
import sequelizeConnection from "../db.config";


@Table({
  tableName: "items",
  timestamps: true,
})
class Item extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image!: string;

  @ForeignKey(() => Stock)
  @Column({
    type: DataType.INTEGER,
  })
  stockId!: number;

  @HasOne(() => Stock)
  stock!: Stock;

  @BelongsToMany(() => Category, () => CategoryItem)
  categories!: Category[];

  @BelongsToMany(() => Cart, () => CartItem)
  cart!: Cart[];

  @BelongsToMany(() => Purchase, () => PurchaseItem)
  purchase!: Purchase[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // After create auto add 1 in stock

  // @AfterCreate
  // static async afterCreateHook(instance: Item) {
  //   const transaction = await sequelizeConnection.transaction();
  //   try {
  //     const stock = await Stock.create({ quantity: 1 }, { transaction });
  //     await instance.$set('stock', stock, { transaction });
  //     await transaction.commit();
  //   } catch (error) {
  //     await transaction.rollback();
  //     logger.error('Error adding stock: ', error);
  //     throw new Error('Error adding stock');
  //   }
  // }

  @AfterCreate
  static async afterCreateSetQuantityToOne(item: Item) {
      const stock = await Stock.create({ quantity: 1 });
      await item.$set("stock", stock);
    
  }

  // Count how many in Stock

  async howManyInStock(): Promise<number> {
    const stock = await this.$get("stock");
    return stock ? stock.quantity : 0;
  }

  // Add Stock

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
        // If there is no stock entry, create one
        const createStock = await Stock.create({ quantity });
        await this.$set("stock", createStock);
      }
    } catch (error) {
      logger.error("Error adding stock: ", error);
      throw new Error("Error adding stock");
    }
  }

  // Remove Stock

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

  // Add Category

  async addCategory(categories: string | string[]): Promise<void> {
    // Ensure categories is an array
    if (!Array.isArray(categories)) {
      categories = [categories];
    }

    try {
      // Search for categories in the database
      const categorySearch = await Category.findAll({
        where: { name: categories },
      });

      // Check if all categories exist
      if (categorySearch.length !== categories.length) {
        throw new Error("One or more categories do not exist");
      }

      // Add the found categories to the item
      await this.$add("categories", categorySearch);
    } catch (error) {
      logger.error("Error adding category: ", error);
      throw new Error("Error adding category");
    }
  }

  async removeCategory(categories: string | string[]): Promise<void> {
    // Ensure categories is an array
    if (!Array.isArray(categories)) {
      categories = [categories];
    }

    try {
      // Search for categories in the database
      const categorySearch = await Category.findAll({
        where: { name: categories },
      });

      // Check if all categories exist
      if (categorySearch.length !== categories.length) {
        throw new Error("One or more categories do not exist");
      }

      // Remove the found categories to the item
      await this.$remove("categories", categorySearch);
    } catch (error) {
      logger.error("Error removing category: ", error);
      throw new Error("Error removing category");
    }
  }

  // Remove from Category
}

export default Item;
