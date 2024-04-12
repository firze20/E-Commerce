import { Sequelize, Dialect } from 'sequelize';
import dotenv from "dotenv";


dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbDriver = process.env.DB_DRIVER as Dialect
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

console.log("Process Enviroment: ", process.env.DB_HOST); // undefined, undefined, undefined, undefined, undefined

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    port: 5432,
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    }
});

export default sequelizeConnection;

