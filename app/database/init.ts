import sequelizeConnection from "./db.config"

const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV !== "test";

export const initDatabase = async () => {
    await sequelizeConnection.sync({ alter: isDev || isTest });
    //console.log("Database synced");
    //console.log("Environment: ", process.env.NODE_ENV);
};