import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, BelongsTo, ForeignKey, PrimaryKey, NotNull, BelongsToMany } from "sequelize-typescript";
import User from "./User";
import CartItem from "./CartItem";
import Item from "./Item";

@Table({
    tableName: "carts",
})
class Cart extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0, // Example: Quantity should not be negative
        },
    })
    quantity!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @BelongsToMany(() => Item, () => CartItem)
    items!: Item[];
}

export default Cart;