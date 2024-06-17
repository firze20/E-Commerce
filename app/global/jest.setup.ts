import dotenv from "dotenv";
import sequelizeConnection from "../database/db.config"; 

// Load enviroment variables

dotenv.config();

beforeAll(async () => {
  // Connect to the database
  await sequelizeConnection.authenticate();
});
