import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, BelongsTo, ForeignKey, PrimaryKey, NotNull } from "sequelize-typescript";
import User from "./User";

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
}

export default Purchase;

