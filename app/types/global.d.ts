import { Express } from "express";
import { Sequelize } from "sequelize-typescript";

declare global {
  var __APP__: Express; 
  var sequelizeConnection: Sequelize
}
