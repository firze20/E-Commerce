// Dotenv config

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

dotenv.config();

// Enviroment Variables
const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER
const dbPassword = process.env.DB_PASSWORD

// Sequelize Postgres Connection
const sequelizeConnection = new Sequelize({
    host: dbHost,
    dialect: "postgres",
    database: dbName,
    username: dbUser,
    password: dbPassword,
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    models: [__dirname + "/models"] //Imports all models inside model folders 
});

export default sequelizeConnection;







