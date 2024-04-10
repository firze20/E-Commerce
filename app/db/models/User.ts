import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "../config/config";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  roles: string[];
  name?: string;
  age?: number;
  password: string;
}

export interface UserInput extends Optional<UserAttributes, "id" | "name" | "age"> {} //Input doesnt come with name and age
export interface UserOutput extends Omit<UserAttributes, 'password'> {} //Output doesnt come with password

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public roles: string[];
  public name?: string;
  public age?: number;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "users",
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);
