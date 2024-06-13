import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  HasOne,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import User from "./User";
import { generateRefreshToken } from "../../utils/jwt";

const refreshTokenExpirity =
  Number(process.env.REFRESH_TOKEN_EXPIRITY) || 345600; // 345600 seconds = 4 days

@Table({
  tableName: "refresh_tokens",
  timestamps: true,
})
class RefreshToken extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
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
    type: DataType.INTEGER,
  })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  static async createToken(user: User) {
    let expiredAt = new Date();

    // Later will have to define a Refresh Expire time in config
    expiredAt.setSeconds(expiredAt.getSeconds() + refreshTokenExpirity);

    let _token = generateRefreshToken(user);

    let refreshToken = await RefreshToken.create({
      token: _token,
      expirityDate: expiredAt.getTime(),
      userId: user.id,
    });

    return refreshToken;
  }

  // Verify Expiration
  static verifyExpiration(token: RefreshToken): boolean {
    return token.expirityDate.getTime() < new Date().getTime();
  }
}

export default RefreshToken;
