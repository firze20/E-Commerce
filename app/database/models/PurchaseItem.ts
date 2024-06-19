import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Purchase from "./Purchase";
import Item from "./Item";

/**
 * Represents the join table for the many-to-many relationship between Purchase and Item.
 * This table manages the association between items and purchases.
 * @class PurchaseItem
 * @extends {Model}
 */
@Table({
    tableName: "purchase_items",
})
class PurchaseItem extends Model {
    /**
     * The foreign key for the purchase associated with this item.
     * @type {number}
     */
    @ForeignKey(() => Purchase)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    purchaseId!: number;

    /**
     * The Purchase model instance associated with this item.
     * @type {Purchase}
     */
    @BelongsTo(() => Purchase)
    purchase!: Purchase;

    /**
     * The foreign key for the item associated with this purchase.
     * @type {number}
     */
    @ForeignKey(() => Item)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    itemId!: number;

    /**
     * The Item model instance associated with this purchase.
     * @type {Item}
     */
    @BelongsTo(() => Item)
    item!: Item;
}

export default PurchaseItem;