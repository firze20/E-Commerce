import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement } from "sequelize-typescript";

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



}