import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "../config/config";

interface RolesAttributes {
  id: number;
  name: string;
  description: string;
}

