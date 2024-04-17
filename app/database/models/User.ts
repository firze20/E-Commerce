import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, HasMany } from "sequelize-typescript";
import RefreshToken from "./RefreshToken";
import Cart from "./Cart";

@Table({
    tableName: "users",
    underscored: true,
    timestamps: true
})
class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true 
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
    })
    declare password: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare age: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare verified: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    // Has One Refresh Token
    @HasOne(() => RefreshToken)
    refreshToken!: RefreshToken;

    // Has One Cart
    @HasOne(() => Cart)
    cart!: Cart;

    //Has Many Purchases

    @HasMany(() => Cart)
    carts!: Cart[];
}

export default User;