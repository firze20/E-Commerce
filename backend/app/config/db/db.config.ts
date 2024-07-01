import dotenv from 'dotenv';

dotenv.config({ path: '.env'});

/**
 * Configuration type definition.
 * @type {Object} DataBaseConfig
 * @property {string} dataBase - The name of the database.
 * @property {string} dataBaseTest - The name of the database for testing.
 * @property {string} dataBaseUser - The user of the database.
 * @property {string} dataBaseHost - The host of the database.
 * @property {string} dataBaseDriver - The driver of the database.
 * @property {string} dataBasePassword - The password of the database.
 */

type DataBaseConfig = {
    dataBase: string;
    dataBaseTest: string;
    dataBaseUser: string;
    dataBaseHost: string;
    dataBaseDriver: string;
    dataBasePassword: string;
}
/**
 * The application configuration object.
 * This object contains critical environment variables for the database.
 * 
 * @type {DataBaseConfig}
 */
const config: DataBaseConfig = {
    dataBase: process.env.DB_NAME as string,
    dataBaseTest: process.env.DB_TEST as string,
    dataBaseUser: process.env.DB_USER as string,
    dataBaseHost: process.env.DB_HOST as string,
    dataBaseDriver: process.env.DB_DRIVER as string,
    dataBasePassword: process.env.DB_PASSWORD as string,
};

if(!config.dataBase){
    throw new Error('Missing environment variable: DB_NAME');
};

if(!config.dataBaseUser){
    throw new Error('Missing environment variable: DB_USER');
}

if(!config.dataBaseHost){
    throw new Error('Missing environment variable: DB_HOST');
}

if(!config.dataBasePassword) {
    throw new Error('Missing environment variable: DB_PASSWORD');
}

if(!config.dataBaseTest) {
    throw new Error('Missing environment variable: DB_TEST');
}

export default config;

