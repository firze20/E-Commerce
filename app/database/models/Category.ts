import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, BelongsTo, ForeignKey, PrimaryKey, NotNull, BelongsToMany } from "sequelize-typescript";
import Item from "./Item";
import CategoryItem from "./CategoryItem";

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

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

    @BelongsToMany(() => Item, () => CategoryItem)
    item!: Item[];
 
}



export default Category;