import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import Category from "./Category";
import Item from "./Item";

/**
 * Represents the join table for the many-to-many relationship between Category and Item.
 * @class
 * @extends {Model}
 */
@Table({
    tableName: "category_items",
})
class CategoryItem extends Model {
    /**
     * The foreign key for the Category.
     * @type {number}
     */
    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    categoryId!: number;

    /**
     * The Category associated with this record.
     * @type {Category}
     */
    @BelongsTo(() => Category)
    category!: Category;

    /**
     * The foreign key for the Item.
     * @type {number}
     */
    @ForeignKey(() => Item)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    itemId!: number;

    /**
     * The Item associated with this record.
     * @type {Item}
     */
    @BelongsTo(() => Item)
    item!: Item;
}

export default CategoryItem;