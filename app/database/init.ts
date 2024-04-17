import sequelizeConnection from "./db.config"

const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV !== "test";

export const initDatabase = () => {
    sequelizeConnection.sync({alter: isDev || isTest}).then(() => {
        console.log("Database synced");
        console.log("Enviroment: ", process.env.NODE_ENV);
    })
}