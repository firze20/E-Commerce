import { Sequelize, DataTypes, Model, InferCreationAttributes, InferAttributes, CreationOptional } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, HasOne, Unique } from '@sequelize/core/decorators-legacy';
import { sequelizeConnection } from '../config/db.config';
import Item from './Items';


export class ItemStock extends Model<InferAttributes<ItemStock>, InferCreationAttributes<ItemStock>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    id!: CreationOptional<number>;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    @Unique
    @HasOne(() => Item, {
        foreignKey: "item_id",
        sourceKey: "id",
        foreignKeyConstraints: true,
    })
    item_id!: Item

    @Attribute(DataTypes.INTEGER)
    @NotNull

    stock!: number;
}

const sequelize = new Sequelize({
   ...sequelizeConnection.options,
    models: [ItemStock], // Pass an array of all your models
});

export default ItemStock;