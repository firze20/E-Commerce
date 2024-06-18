import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  AfterCreate,
  BeforeCreate,
} from "sequelize-typescript";
import User from "./User";
import { generateRefreshToken } from "../../utils/jwt";

// Default refresh token expiry in seconds (4 days)
const refreshTokenExpiry = Number(process.env.REFRESH_TOKEN_EXPIRY) || 345600;

/**
 * Represents the refresh tokens issued to users for authentication.
 * @class RefreshToken
 * @extends {Model}
 */
@Table({
  tableName: "refresh_tokens",
  timestamps: true,
})
class RefreshToken extends Model {
  /**
   * The unique identifier for the refresh token.
   * @type {number}
   */
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id!: number;

  /**
   * The token string generated for authentication.
   * @type {string}
   */
  @Column({
    type: DataType.STRING,
  })
  token!: string;

  /**
   * The expiry date of the refresh token.
   * @type {Date}
   */
  @Column({
    type: DataType.DATE,
  })
  expirityDate!: Date;

  /**
   * The ID of the user associated with this refresh token.
   * @type {number}
   */
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId!: number;

  /**
   * The user model instance associated with this refresh token.
   * @type {User}
   */
  @BelongsTo(() => User)
  user!: User;

  /**
   * The timestamp when this refresh token was created.
   * @type {Date}
   */
  @CreatedAt
  createdAt!: Date;

  /**
   * The timestamp when this refresh token was last updated.
   * @type {Date}
   */
  @UpdatedAt
  updatedAt!: Date;

  /**
   * Creates a new refresh token for the given user.
   * @static
   * @async
   * @param {User} user - The user for whom the refresh token is being created.
   * @returns {Promise<RefreshToken>} The created refresh token.
   */
  static async createToken(user: User): Promise<RefreshToken> {
    let expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + refreshTokenExpiry);

    let _token = generateRefreshToken(user);

    let refreshToken = await RefreshToken.create({
      token: _token,
      expirityDate: expiredAt.getTime(),
      userId: user.id,
    });

    return refreshToken;
  }

  /**
   * Verifies if the given refresh token has expired.
   * @static
   * @param {RefreshToken} token - The refresh token to verify.
   * @returns {boolean} True if the token has expired, false otherwise.
   */
  static verifyExpiration(token: RefreshToken): boolean {
    return token.expirityDate.getTime() < new Date().getTime();
  }

  @BeforeCreate
  static async deletePastTokens(refreshToken: RefreshToken): Promise<void> {
    try {
      console.log("BeforeCreate hook called for user:", refreshToken.userId);

      const tokens = await RefreshToken.findAll({
        where: {
          userId: refreshToken.userId,
        },
      });
      for (const token of tokens) {
          await token.destroy();
      }
    } catch (error) {
      console.error("Error deleting past tokens:", error);
    }
  }
}

export default RefreshToken;
