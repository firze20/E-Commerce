import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, BelongsTo, ForeignKey, NotNull } from "sequelize-typescript";
import Category from "./Category";
import Item from "./Item";

@Table({
    tableName: "category_items",
})

class CategoryItem extends Model {
    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    categoryId!: number;

    @BelongsTo(() => Category)
    category!: Category;

    @ForeignKey(() => Item)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    itemId!: number;

    @BelongsTo(() => Item)
    item!: Item;
}

export default CategoryItem;