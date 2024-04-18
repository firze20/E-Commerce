
import Role from "../../app/database/models/Role";
import connectDatabase from "../../app/utils/connect";

const dbTeardown = async () => {
  await Role.destroy({ cascade: true, truncate: true, force: true });
};

describe("Test Roles", () => {
  beforeAll(async () => {
    await connectDatabase(); // Initialize database connection
  }, 20000); // Adding 20 seconds because it needs to resync all models

  beforeEach(async () => {
    jest.clearAllMocks();

    // Create sample role records
    await Promise.all([
      Role.create({
        id: 1,
        name: "client",
        description: "Simple client that can buy items",
      }),
      Role.create({
        id: 2,
        name: "moderator",
        description: "Can buy and add items and stocks for each item",
      }),
      Role.create({
        id: 3,
        name: "admin",
        description:
          "Can buy, manage items and stocks, and manage users in the database",
      }),
    ]);
  });

  it("Should return role details", async () => {
    // Mock response for findOne method
    const mockResponse = {
      id: 1,
      name: "client",
      description: "Simple client that can buy items",
    };
    // Call your model method or perform operations here

    // Assert expectations
    // For example:
    const result = await Role.findOne({
      where: { id: 1 },
    });
    expect(result?.description).toEqual(mockResponse.description);
  });

  afterAll(async () => {
    await dbTeardown(); // Clean up database after all tests
  });
});
