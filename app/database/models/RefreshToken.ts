import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, BelongsTo, ForeignKey } from "sequelize-typescript";
import User from "./User";
import { v4 as uuidv4 } from "uuid";

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
    declare expirityDate: Date;

    
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

    async createToken(user: User) {
        let expiredAt = new Date();

        // Later will have to define a Refresh Expire time in config 
        expiredAt.setSeconds(expiredAt.getSeconds() + 60 * 60 * 24 * 30);

        let _token = uuidv4(); 

       let refreshToken = await RefreshToken.create({
            token: _token,
            expirityDate: expiredAt.getTime(),
            userId: user.id
        });

        return refreshToken;
    }

    // Verify Expiration
    verifyExpiration(token: RefreshToken) {
        return token.expirityDate.getTime() < new Date().getTime();
    }
}

export default RefreshToken;