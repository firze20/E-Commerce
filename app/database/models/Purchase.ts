import { Table, Column, Model, DataType, CreatedAt, ForeignKey, AutoIncrement, BelongsToMany, PrimaryKey, BelongsTo } from "sequelize-typescript";
import User from "./User";
import Item from "./Item";
import Cart from "./Cart";
import PurchaseItem from "./PurchaseItem";
import sequelize from "../db.config";

/**
 * Represents an Purchase in the database.
 * @class
 * @extends {Model}
 */
@Table({
    tableName: "purchases"
})
class Purchase extends Model {
    /**
     * The unique identifier for the purchase.
     * @type {number}
     */
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    /**
     * The date when the purchase was made.
     * @type {Date}
     */
    @Column({
        type: DataType.DATE
    })
    date!: Date;

      /**
     * The items purchased in this purchase.
     * @type {Item[]}
     */
      @BelongsToMany(() => Item, () => PurchaseItem)
      items!: Item[];

    /**
     * The foreign key for the user who made the purchase.
     * @type {number}
     */
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Cart)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cartId!: number;

    @BelongsTo(() => Cart)
    cart!: Cart;

    @Column({
        type: DataType.DECIMAL(10, 2), // Adjust precision and scale as needed
        allowNull: false,
        defaultValue: 0.0,
    })
    totalPrice!: number; // Total price of the purchase

    // Create purchase

    static async createPurchase(user: User): Promise<void> {
        // const transaction = await sequelize.transaction();

        // const cart = await Cart.findOne({
        //     where: {
        //         userId: user.id,
        //     }
        // });


    }

    async getPurchasePrice(): Promise<number> {
        return 1
    }

    // async getPurchaseItems(): Promise<Item[]> {
        
    // }

    
}

export default Purchase;