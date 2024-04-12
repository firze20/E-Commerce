import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "../config/db.config";

interface CategoryAttributes {
  id: number;
  name: string;
  description: string;

  // time-stamps
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryInput extends Optional<CategoryAttributes, "id"> {} // Input doesnt need id
export interface CategoryOutput extends Required<CategoryAttributes> {} // Output

class Category
  extends Model<CategoryAttributes, CategoryInput>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
}

Category.init(
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
    timestamps: true,
    tableName: "categories",
    sequelize: sequelizeConnection,
  }
);

export default Category;