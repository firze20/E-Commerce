import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, BelongsTo, ForeignKey } from "sequelize-typescript";
import User from "./User";

@Table({
    tableName: "refresh_tokens",
    timestamps: true
})
class RefreshToken extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true 
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
    })
    declare token: string;

    @Column({
        type: DataType.DATE,
    })
    declare expirity: string;

    
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;
}

export default RefreshToken;