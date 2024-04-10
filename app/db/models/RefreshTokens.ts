import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "../config/db.config";

interface RefreshTokensAttributes {
  token: string;
  userId: number;
  expires: Date;
}

export interface RefreshTokensInput extends Omit<RefreshTokensAttributes, "userId" | "expires"> {} //Input doesnt need userId, or expires
export interface RefreshTokensOutput extends Pick<RefreshTokensAttributes, 'token'> {} //Opposite of Omit, Pick only picks the specified attributes

class RefreshTokens extends Model<RefreshTokensAttributes, RefreshTokensInput> implements RefreshTokensAttributes {
  public token!: string;
  public userId!: number;
  public expires!: Date;
}
