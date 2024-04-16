import { Sequelize, DataTypes, Model, CreationOptional } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, HasOne, Unique } from '@sequelize/core/decorators-legacy';
import { sequelizeConnection } from '../config/db.config';
import ItemStock from './ItemStock';

export class Item extends Model {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    id!: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    @NotNull
    name!: string;
    
    @Attribute(DataTypes.STRING)
    @NotNull
    description!: string;

    @Attribute(DataTypes.FLOAT)
    @NotNull
    price!: number;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    @Unique
    @HasOne(() => ItemStock, {
        foreignKey: "id",
        sourceKey: "item_id",
        foreignKeyConstraints: true,
    })
    itemStock!: ItemStock
}

// Now pass your models to the Sequelize constructor

const sequelize = new Sequelize({
    ...sequelizeConnection.options,
    models: [Item], // Pass an array of all your models
});

export default Item;
