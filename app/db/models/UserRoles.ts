import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config/db.config";
import Role from "./Roles";
import User from "./User";

interface UserRoleAttributes {
    userId: number;
    roleId: number; 
}

export interface UserRoleInput extends Required<UserRoleAttributes>{}

export interface UserRoleOutput extends Required<UserRoleAttributes>{}

class UserRole extends Model<UserRoleAttributes, UserRoleInput> implements UserRoleAttributes {
    public userId!: number;
    public roleId!: number;


}

UserRole.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: User,
        //     key: "id"
        // }
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: Role,
        //     key: "id"
        // }
    }
}, {
    tableName: "user_roles",
    sequelize: sequelizeConnection
});

export default UserRole;