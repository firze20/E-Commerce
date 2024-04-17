import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, BelongsTo, ForeignKey, PrimaryKey, NotNull } from "sequelize-typescript";

@Table({
    tableName: "categories",
})

class Category extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
    })
    description!: string;
}

export default Category;