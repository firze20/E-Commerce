import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, HasMany, BelongsToMany } from "sequelize-typescript";
import RefreshToken from "./RefreshToken";
import Cart from "./Cart";
import Role from "./Role";
import UserRole from "./UserRoles";
import Purchase from "./Purchase";

import logger from "../../utils/logger";

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

    // Check if user has specific role 
    async hasRole(roleName: string): Promise<boolean> {
        const roles = await this.$get('roles') as Role[];
        return roles.some(role => role.name === roleName);
    }
    
    // Add Role 
    async addRoles(roleNames: string | string[]): Promise<void> {
        try {
          const rolesToAssign = Array.isArray(roleNames) ? roleNames : [roleNames];
          const roles = await Role.findAll({ where: { name: rolesToAssign } });
      
          if (roles.length !== rolesToAssign.length) {
            // Some roles were not found in the database
            throw new Error('One or more roles do not exist');
          }
      
          // Assign roles to the user
          await this.$set('roles', roles);
        } catch (error) {
          logger.error('Error adding role(s) to user:', error);
          throw new Error('Failed to add role(s) to user');
        }
      }      
}

export default User;