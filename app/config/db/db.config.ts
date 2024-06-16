import dotenv from 'dotenv';

dotenv.config();

/**
 * Configuration type definition.
 * @type {Object} DataBaseConfig
 * @property {string} dataBaseName - The name of the database.
 * @property {string} dataBaseUser - The user of the database.
 * @property {string} dataBaseHost - The host of the database.
 * @property {string} dataBaseDriver - The driver of the database.
 * @property {string} dataBasePassword - The password of the database.
 */

type DataBaseConfig = {
    dataBaseName: string;
    dataBaseNameTest: string;
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
    dataBaseName: process.env.DATABASE_NAME as string,
    dataBaseNameTest: process.env.DB_TEST as string,
    dataBaseUser: process.env.DATABASE_USER as string,
    dataBaseHost: process.env.DATABASE_HOST as string,
    dataBaseDriver: process.env.DATABASE_DRIVER as string,
    dataBasePassword: process.env.DATABASE_PASSWORD as string,
};

if(!config.dataBaseName){
    throw new Error('Missing environment variable: DATABASE_NAME');
};

if(!config.dataBaseUser){
    throw new Error('Missing environment variable: DATABASE_USER');
}

if(!config.dataBaseHost){
    throw new Error('Missing environment variable: DATABASE_HOST');
}

if(!config.dataBasePassword) {
    throw new Error('Missing environment variable: DATABASE_PASSWORD');
}

if(!config.dataBaseNameTest) {
    throw new Error('Missing environment variable: DB_TEST');
}

export default config;

