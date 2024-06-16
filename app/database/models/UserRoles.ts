import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import User from "./User";
import Role from "./Role";

/**
 * Represents a user role mapping in the database.
 * @class UserRole
 * @extends {Model<UserRole>}
 */
@Table({
    tableName: "user_roles",
})
class UserRole extends Model<UserRole> {
    /**
     * The foreign key to the User table.
     * @type {number}
     */
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;

    /**
     * The foreign key to the Role table.
     * @type {number}
     */
    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    roleId!: number;

    /**
     * The user associated with this UserRole.
     * @type {User}
     */
    @BelongsTo(() => User)
    user!: User;

    /**
     * The role associated with this UserRole.
     * @type {Role}
     */
    @BelongsTo(() => Role)
    role!: Role;
}

export default UserRole;