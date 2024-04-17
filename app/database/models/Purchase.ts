import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, BelongsTo, ForeignKey, PrimaryKey, NotNull, BelongsToMany } from "sequelize-typescript";
import User from "./User";
import Item from "./Item";
import PurchaseItem from "./PurchaseItem";

@Table({
    tableName: "purchases"
})

class Purchase extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column({
        type: DataType.DATE
    })
    date!: Date;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;

    // Belongs To Many Item
    @BelongsToMany(() => Item, () => PurchaseItem)
    items!: Item[];
}

export default Purchase;

