import dotenv from 'dotenv';

dotenv.config();

/**
 * @type {Object} Context
 * @property {boolean} isTest - Whether the application is running in test mode.
 * @property {boolean} isDev - Whether the application is running in development mode.
 * @property {boolean} isProduction - Whether the application is running in production mode.
 */
type Context = {
    isTest: boolean;
    isDev: boolean;
    isProduction: boolean;
}
/**
 * The application configuration object.
 * This object contains critical environment variables for the application.
 * 
 * @type {Context}
 */
const context: Context = {
    isTest: process.env.NODE_ENV === 'test',
    isDev: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
};

export default context;

