import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "../config/db.config";

interface PurchaseAttributes {
  id: number;
  date: Date;
  user_id: number;
  // time-stamps!
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PurchaseInput extends Optional<PurchaseAttributes, "id"> {} // Input doesnt need id>
export interface PurchaseOutput extends Required<PurchaseAttributes> {} // Output doesnt need id>

class Purchase
  extends Model<PurchaseAttributes, PurchaseInput>
  implements PurchaseAttributes
{
  public id!: number;
  public date!: Date;
  public user_id!: number;
}

Purchase.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: "Purchases",
    paranoid: true,
  }
);

export default Purchase;
