import { closeDatabase } from "../utils/connect";

async function globalTearDown() {
    await closeDatabase();
}   

export default globalTearDown;