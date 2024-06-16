import { Table, Column, Model, DataType, BelongsTo, ForeignKey, PrimaryKey, BelongsToMany, AutoIncrement } from "sequelize-typescript";
import User from "./User";
import CartItem from "./CartItem";
import Item from "./Item";

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
     * The quantity of items in the Cart.
     * @type {number}
     */
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0, // Example: Quantity should not be negative
        },
    })
    quantity!: number;

    /**
     * The ID of the User who owns the Cart.
     * @type {number}
     */
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;

    /**
     * The User who owns the Cart.
     * @type {User}
     */
    @BelongsTo(() => User)
    user!: User;

    /**
     * The items in the Cart.
     * @type {Item[]}
     */
    @BelongsToMany(() => Item, () => CartItem)
    items!: Item[];
}

export default Cart;