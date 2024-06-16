import { Table, Column, Model, DataType, CreatedAt, ForeignKey, AutoIncrement, BelongsToMany, PrimaryKey } from "sequelize-typescript";
import User from "./User";
import Item from "./Item";
import PurchaseItem from "./PurchaseItem";
/**
 * Represents an Purchase in the database.
 * @class
 * @extends {Model}
 */
@Table({
    tableName: "purchases"
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
        type: DataType.DATE
    })
    date!: Date;

    /**
     * The foreign key for the user who made the purchase.
     * @type {number}
     */
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;

    /**
     * The items purchased in this purchase.
     * @type {Item[]}
     */
    @BelongsToMany(() => Item, () => PurchaseItem)
    items!: Item[];
}

export default Purchase;