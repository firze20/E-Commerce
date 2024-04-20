import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, HasMany, BelongsToMany } from "sequelize-typescript";
import RefreshToken from "./RefreshToken";
import Cart from "./Cart";
import Role from "./Role";
import UserRole from "./UserRoles";
import Purchase from "./Purchase";

import bcrypt from "bcrypt";

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
        unique: true,
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        unique: true,
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
    @HasMany(() => Purchase)
    purchase!: Purchase[];

    // Belons To Many Roles
    @BelongsToMany(() => Role, () => UserRole)
    roles!: Role[];

    @BeforeCreate
    static async hashPassword(user: User) {
        user.password = await bcrypt.hash(user.password, 10);
    }
}

export default User;