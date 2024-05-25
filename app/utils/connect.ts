import sequelizeConnection from "../database/db.config";
import logger from "../utils/logger";

const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

const connectDatabase = async () => {
    try {
        await sequelizeConnection.authenticate();
        logger.info("Database connection established");
        await sequelizeConnection.sync({ alter: isDev || isTest });
        logger.info("Database synced");
        logger.info("Environment: " + process.env.NODE_ENV);
        if (isDev || isTest) {
            logger.info("Database connection established for development environment");
        }
    } catch (error) {
        logger.error("Database synchronization failed:", error);
        throw error; // Rethrow the error to propagate it
    }
};

const closeDatabase = async () => {
    try {
        await sequelizeConnection.close();
        logger.info("Database closed");
    } catch (error) {
        logger.error("Database close failed:", error);
        throw error; // Rethrow the error to propagate it
    }
};


export {connectDatabase, closeDatabase};
