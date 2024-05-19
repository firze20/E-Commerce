import { connectDatabase } from "../app/utils/connect";

beforeAll(async () => {
  await connectDatabase();
}, 25000);
