import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "../config/db.config";
import Role from "./Roles";
import UserRole from "./UserRoles";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  name?: string;
  age?: number;
  password: string;
}

export interface UserInput extends Optional<UserAttributes, "id" | "name" | "age"> {} // Input doesnt need id or name, or age
export interface UserOutput extends Omit<UserAttributes, 'password'> {} // Output doesnt come with password, use Omit 

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
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
  }
);



// User.belongsToMany(Role, {
//   through: "user_roles",
//   foreignKey: "role_id",
//   otherKey: "user_id"
// });

// Role.belongsToMany(User, {
//   through: "user_roles",
//   foreignKey: "user_id",
//   otherKey: "role_id"
// });


export default User;