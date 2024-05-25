import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, ForeignKey, NotNull } from "sequelize-typescript";
import Item from "./Item";

@Table({
    tableName: "stocks",
    timestamps: true
})
class Stock extends Model {
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    id!: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    quantity!: number

    @ForeignKey(() => Item)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    itemId!: number;

    @HasOne(() => Item)
    declare item: Item;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}

export default Stock;