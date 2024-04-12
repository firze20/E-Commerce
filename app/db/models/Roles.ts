'use strict';
import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "../config/db.config";

interface RolesAttributes {
  id: number;
  name: string;
  description: string;
};

export interface RolesInput extends Optional<RolesAttributes, "id"> {} //Input doesnt need id
export interface RolesOutput extends Required<RolesAttributes> {} 

class Role extends Model<RolesAttributes, RolesInput> implements RolesAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
}

Role.init(
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
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Roles",
  }
);

export default Role;

