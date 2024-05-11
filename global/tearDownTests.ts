import { closeDatabase } from "../app/utils/connect";

async function globalTearDown() {
    await closeDatabase();
}   

export default globalTearDown;