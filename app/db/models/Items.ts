import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "../config/db.config";

interface ItemAttributes {
  id: number;
  name: string;
  description: string;
  price: string;
  rating: string;
  item_stock_id: number;

  // time-stamps!
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ItemInput extends Optional<ItemAttributes, "id"> {} // Input doesnt need id
export interface ItemOutput extends Required<ItemAttributes> {} //

class Item extends Model<ItemAttributes, ItemInput> implements ItemAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: string;
  public rating!: string;
  public item_stock_id!: number;
}

Item.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }, 
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        item_stock_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: true,
        sequelize: sequelizeConnection,
        tableName: "Items",
        paranoid: true,
    }
);

export default Item;