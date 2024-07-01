import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BelongsToMany } from "sequelize-typescript";
import UserRole from "./UserRoles";
import User from "./User";

/**
 * Represents a role that can be assigned to users.
 * @class Role
 * @extends {Model}
 */
@Table({
    tableName: "roles",
    timestamps: true
})
class Role extends Model {
    /**
     * The unique identifier for the role.
     * @type {number}
     */
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    /**
     * The name of the role.
     * @type {string}
     */
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    name!: string;

    /**
     * The description of the role.
     * @type {string}
     */
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description!: string;

    /**
     * The timestamp when this role was created.
     * @type {Date}
     */
    @CreatedAt
    createdAt!: Date;

    /**
     * The timestamp when this role was last updated.
     * @type {Date}
     */
    @UpdatedAt
    updatedAt!: Date;

    /**
     * The users associated with this role.
     * @type {User[]}
     */
    @BelongsToMany(() => User, () => UserRole)
    users!: User[];
}

export default Role;