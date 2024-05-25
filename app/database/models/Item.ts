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
} from "sequelize-typescript";
import Stock from "./Stock";
import Category from "./Category";
import CategoryItem from "./CategoryItem";
import Cart from "./Cart";
import CartItem from "./CartItem";
import Purchase from "./Purchase";
import PurchaseItem from "./PurchaseItem";

import logger from "../../utils/logger";

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

  async addCategory(categories: string | string[]): Promise<void> {}

  // Remove from Category
}

export default Item;
