import {connectDatabase} from "../app/utils/connect";

async function globalSetup() {
    await connectDatabase();
}

export default globalSetup;