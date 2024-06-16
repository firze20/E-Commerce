import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import Cart from "./Cart";
import Item from "./Item";

/**
 * Represents a CartItem in the database.
 * @class
 * @extends {Model}
 */
@Table({
    tableName: "cart_items",
    timestamps: true
})
class CartItem extends Model {
    /**
     * The ID of the Item associated with this CartItem.
     * @type {number}
     */
    @ForeignKey(() => Item)
    @Column(DataType.INTEGER)
    itemId!: number;

    /**
     * The Item associated with this CartItem.
     * @type {Item}
     */
    @BelongsTo(() => Item)
    item!: Item;

    /**
     * The ID of the Cart associated with this CartItem.
     * @type {number}
     */
    @ForeignKey(() => Cart)
    @Column(DataType.INTEGER)
    cartId!: number;

    /**
     * The Cart associated with this CartItem.
     * @type {Cart}
     */
    @BelongsTo(() => Cart)
    cart!: Cart;
}

export default CartItem;