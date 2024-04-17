import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, ForeignKey, BelongsToMany } from "sequelize-typescript";
import Stock from "./Stock";
import Category from "./Category";
import CategoryItem from "./CategoryItem";
import Cart from "./Cart";
import CartItem from "./CartItem";
import Purchase from "./Purchase";
import PurchaseItem from "./PurchaseItem";

@Table({
    tableName: "items",
    timestamps: true
})

class Item extends Model {
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    price!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    image!: string;

    @ForeignKey(() => Stock)
    @Column({
        type: DataType.INTEGER
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
}

export default Item;