import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "../config/db.config";

interface ItemStockAttributes {
    id: number;
    item_id: number;
    stock: number;
}

export interface ItemStockInput extends Optional<ItemStockAttributes, "id"> {} // Input doesnt need id
export interface ItemStockOutput extends Required<ItemStockAttributes>  {} //

class ItemStock extends Model<ItemStockAttributes, ItemStockInput> implements ItemStockAttributes {
    public id!: number;
    public item_id!: number;
    public stock!: number;
}

ItemStock.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        sequelize: sequelizeConnection,
        tableName: "item_stocks",
    }
);

export default ItemStock;



