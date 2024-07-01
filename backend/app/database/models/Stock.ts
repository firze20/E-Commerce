import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, ForeignKey, NotNull } from "sequelize-typescript";
import Item from "./Item";
/**
 * Represents the stock of items in the inventory.
 * @class Stock
 * @extends {Model}
 */
@Table({
    tableName: "stocks",
    timestamps: true
})
class Stock extends Model {
       /**
     * The unique identifier for the stock entry.
     * @type {number}
     */
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    id!: number;
    /**
     * The quantity of items available in stock.
     * @type {number}
     */
    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    quantity!: number
     /**
     * The ID of the item associated with this stock entry.
     * @type {number}
     */
    @ForeignKey(() => Item)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    itemId!: number;
    /**
     * The item associated with this stock entry.
     * @type {Item}
     */
    @HasOne(() => Item)
    declare item: Item;
    /**
     * The timestamp when this stock entry was created.
     * @type {Date}
     */
    @CreatedAt
    createdAt!: Date;
    /**
     * The timestamp when this stock entry was last updated.
     * @type {Date}
     */
    @UpdatedAt
    updatedAt!: Date;
}

export default Stock;