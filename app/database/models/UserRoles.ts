import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, BelongsTo, ForeignKey, NotNull } from "sequelize-typescript";
import User from "./User";
import Role from "./Role";

@Table({
    tableName: "user_roles",
})
class UserRole extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    roleId!: number;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Role)
    role!: Role;
}

export default UserRole;