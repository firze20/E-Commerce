import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "../config/db.config";

interface CartAttributes {
    id: number;
    quantity: number;
    user_id: number;
}

export interface CartInput extends Optional<CartAttributes, "id"> {} // Input doesnt need id
export interface CartOutput extends Required<CartAttributes> {} //

class Cart extends Model<CartAttributes, CartInput> implements CartAttributes {
    public id!: number;
    public quantity!: number;
    public user_id!: number;
};

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
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
        tableName: "Carts",
        paranoid: true,
    }
);

export default Cart;

