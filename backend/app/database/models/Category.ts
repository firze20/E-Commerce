import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, BelongsToMany, PrimaryKey, AfterDestroy } from "sequelize-typescript";
import Item from "./Item";
import CategoryItem from "./CategoryItem";

/**
 * Represents a Category in the database.
 * @class
 * @extends {Model}
 */
@Table({
    tableName: "categories",
})
class Category extends Model {
    /**
     * The unique identifier for the Category.
     * @type {number}
     */
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    /**
     * The name of the Category.
     * @type {string}
     */
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    /**
     * The description of the Category.
     * @type {string}
     */
    @Column({
        type: DataType.STRING,
    })
    description!: string;

    /**
     * The date the Category was created.
     * @type {Date}
     */
    @CreatedAt
    createdAt!: Date;

    /**
     * The date the Category was last updated.
     * @type {Date}
     */
    @UpdatedAt
    updatedAt!: Date;

    /**
     * The items associated with this Category.
     * @type {Item[]}
     */
    @BelongsToMany(() => Item, () => CategoryItem)
    items!: Item[];

    /**
     * Removes all CategoryItems associated with the Category.
     * @param {Category} instance The Category instance to remove items from.
     */
    @AfterDestroy
    static async removeCategoryItems(instance: Category) {
        await CategoryItem.destroy({ where: { categoryId: instance.id } });
    }
    
}

export default Category;