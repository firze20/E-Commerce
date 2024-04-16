import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config/config";

type UserAttributes = {
  id: number;
  username: string;
  email: string;
  password: string;
  name?: string;
  age?: number;
  verified: boolean;
};

export type UserCreationAttributes = Exclude<Optional<UserAttributes, "id" | "name" | "age">, "verified">; //Exclude verified but pick optional Id, name and age

export type UserOutputAttributes = Omit<
  UserAttributes,
  "password" & "verified"
>; //Output

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public name?: string;
  public age?: number;
  public verified!: boolean;
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
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
    timestamps: true,
    tableName: "users",
  }
);

export default User;


