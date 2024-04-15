import { Sequelize, DataTypes, Model } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';
import { sequelizeConnection } from '../config/db.config';

export class Item extends Model {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    id!: number;

    @Attribute(DataTypes.STRING)
    @NotNull
    name!: string;
    
    @Attribute(DataTypes.STRING)
    @NotNull
    description!: string;

    @Attribute(DataTypes.FLOAT)
    @NotNull
    price!: number;
}

// Now pass your models to the Sequelize constructor

const sequelize = new Sequelize({
    ...sequelizeConnection.options,
    models: [Item], // Pass an array of all your models
});

export default Item;
