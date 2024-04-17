import sequelizeConnection from "./db.config"

export const initDatabase = () => {
    sequelizeConnection.sync({force: true}).then(() => {
        console.log("Database synced")
    })
}