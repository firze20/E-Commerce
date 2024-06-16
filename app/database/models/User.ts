import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, HasMany, BelongsToMany, AfterCreate } from "sequelize-typescript";
import RefreshToken from "./RefreshToken";
import Cart from "./Cart";
import Role from "./Role";
import UserRole from "./UserRoles";
import Purchase from "./Purchase";
import logger from "../../utils/logger";
import bcrypt from "bcrypt";

/**
 * Represents a user in the application.
 * @class User
 * @extends {Model}
 */
@Table({
    tableName: "users",
    underscored: true,
    timestamps: true
})
class User extends Model {
    /**
     * The unique identifier for the user.
     * @type {number}
     */
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true 
    })
    declare id: number;

    /**
     * The username of the user.
     * @type {string}
     */
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    declare username: string;

    /**
     * The email of the user.
     * @type {string}
     */
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    declare email: string;

    /**
     * The hashed password of the user.
     * @type {string}
     */
    @Column({
        type: DataType.STRING,
    })
    declare password: string;

    /**
     * The name of the user.
     * @type {string}
     */
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare name: string;

    /**
     * The age of the user.
     * @type {number}
     */
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare age: number;

    /**
     * Indicates if the user's email is verified.
     * @type {boolean}
     */
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare verified: boolean;

    /**
     * The timestamp when the user was created.
     * @type {Date}
     */
    @CreatedAt
    declare createdAt: Date;

    /**
     * The timestamp when the user was last updated.
     * @type {Date}
     */
    @UpdatedAt
    declare updatedAt: Date;

    /**
     * The refresh token associated with the user.
     * @type {RefreshToken}
     */
    @HasOne(() => RefreshToken)
    refreshToken!: RefreshToken;

    /**
     * The cart associated with the user.
     * @type {Cart}
     */
    @HasOne(() => Cart)
    cart!: Cart;

    /**
     * The purchases made by the user.
     * @type {Purchase[]}
     */
    @HasMany(() => Purchase)
    purchase!: Purchase[];

    /**
     * The roles associated with the user.
     * @type {Role[]}
     */
    @BelongsToMany(() => Role, () => UserRole)
    roles!: Role[];

    /**
     * Hashes the user's password before storing it in the database.
     * @param {User} user - The user instance.
     * @returns {Promise<void>}
     */
    @BeforeCreate
    static async hashPassword(user: User): Promise<void> {
        user.password = await bcrypt.hash(user.password, 10);
    }

    /**
     * Creates a cart for the user after the user is created.
     * @param {User} user - The user instance.
     * @returns {Promise<void>}
     */
    @AfterCreate
    static async createUserCart(user: User): Promise<void> {
        const cart = await Cart.create({ userId: user.id });
        await user.$set('cart', cart);
    }

    /**
     * Checks if the user has a specific role.
     * @param {string} roleName - The name of the role to check.
     * @returns {Promise<boolean>}
     */
    async hasRole(roleName: string): Promise<boolean> {
        const roles = await this.$get('roles') as Role[];
        return roles.some(role => role.name === roleName);
    }
    
    /**
     * Adds roles to the user.
     * @param {string | string[]} roleNames - The name(s) of the roles to add.
     * @returns {Promise<void>}
     * @throws {Error} If one or more roles do not exist.
     */
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