import {connectDatabase} from "../utils/connect";

async function globalSetup() {
    await connectDatabase();
}

export default globalSetup;