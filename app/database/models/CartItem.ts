import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, BelongsTo, ForeignKey, NotNull } from "sequelize-typescript";
import Cart from "./Cart";
import Item from "./Item";

@Table({
    tableName: "cart_items",
    timestamps: true
})
class CartItem extends Model {
    @ForeignKey(() => Item)
    @Column(DataType.INTEGER)
    itemId!: number;

    @BelongsTo(() => Item)
    item!: Item;

    @ForeignKey(() => Cart)
    @Column(DataType.INTEGER)
    cartId!: number;

    @BelongsTo(() => Cart)
    cart!: Cart;
}

export default CartItem;

