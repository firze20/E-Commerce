import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, BelongsTo, ForeignKey, NotNull } from "sequelize-typescript";
import Purchase from "./Purchase";
import Item from "./Item";

@Table({
    tableName: "purchase_items",
})
class PurchaseItem extends Model {
    @ForeignKey(() => Purchase)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    purchaseId!: number;

    @BelongsTo(() => Purchase)
    purchase!: Purchase;

    @ForeignKey(() => Item)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    itemId!: number;

    @BelongsTo(() => Item)
    item!: Item;
}

export default PurchaseItem;

