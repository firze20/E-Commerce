import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, BelongsTo, ForeignKey, PrimaryKey, NotNull, BelongsToMany } from "sequelize-typescript";
import UserRole from "./UserRoles";
import User from "./User";

@Table({
    tableName: "roles",
    timestamps: true
})

class Role extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

    @BelongsToMany(() => User, () => UserRole)
    user!: User[];
}



export default Role;