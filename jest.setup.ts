import {connectDatabase, closeDatabase} from "./app/utils/connect";

// Global setup

beforeAll(async () => {
    await connectDatabase();
}, 25000) ;

// Global teardown

afterAll(async () => {
    await closeDatabase();
})