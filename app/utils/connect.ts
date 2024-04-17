import sequelizeConnection from "../database/db.config"
import logger from "../utils/logger";

const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV !== "test";

const connectDatabase = async () => {
    await sequelizeConnection.sync({ alter: isDev || isTest });
    logger.info("Database synced");
    logger.info("Environment: " + process.env.NODE_ENV);
};

export default connectDatabase;