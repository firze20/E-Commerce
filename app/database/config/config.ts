// Dotenv config

import dotenv from 'dotenv';
import { Sequelize, Dialect } from 'sequelize';

dotenv.config();

// Enviroment Variables
const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD

// Sequelize Postgres Connection
const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
});

export default sequelizeConnection;







