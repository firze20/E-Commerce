import Config from "../config/db/db.config";
import Context from "../config/context/context.config";
import { Sequelize } from 'sequelize-typescript';

const {
    dataBase,
    dataBaseUser,
    dataBaseHost,
    dataBaseTest,
    dataBasePassword
} = Config;

const {
    isTest,
    isDev
} = Context;

// Enviroment Variables
const dbName = isTest || isDev ? dataBaseTest : dataBase
const dbUser = dataBaseUser
const dbHost = dataBaseHost
const dbPassword = dataBasePassword

// Sequelize Postgres Connection
const sequelizeConnection = new Sequelize({
    host: dbHost,
    dialect: "postgres",
    database: dbName,
    username: dbUser,
    password: dbPassword,
    ssl: true,
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    models: [__dirname + "/models"], //Imports all models inside model folders ,
});

export default sequelizeConnection;







