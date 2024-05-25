
import Item from "../../app/database/models/Item";
import Role from "../../app/database/models/Role";
import User from "../../app/database/models/User";
import {connectDatabase, closeDatabase} from "../../app/utils/connect";

const dbTeardown = async () => {
  await closeDatabase();
};

describe("Test Database Models", () => {
  beforeAll(async () => {
    await connectDatabase(); // Initialize database connection
  }, 25000); // Adding a timeout of 25 seconds

  beforeEach(async () => {
    jest.clearAllMocks();
    
    // Probably won't use it 
  }); 

  it("Test Role Creation and Getter", async () => {
    // Mock response for findOne method
    const mockResponse = {
      name: "User",
      description: "User that can buy items",
    };
    // Call your model method or perform operations here

    // Assert expectations
    // For example:
    const result = await Role.findOne({
      where: { name: "User" },
    });
    expect(result?.description).toEqual(mockResponse.description);
  });

  it("Test if item corresponds to the following model", async () => {
    const mockResponse = {
      name: "Box of Pencils",
      description: "A box of 100 pencils",
      price: 2.50,
    }

    const result = await Item.findOne({
      where: { name: "Box of Pencils" },
    });

    expect(result?.name).toBe(mockResponse.name);
  });

  it("Test if user creation generates bcrypt or generate salt for passwords", async () => {

    const password = "password300"

    const user = await User.create({
      username: "Test User",
      password: password,
      email: "test@gmail.com",
    });


    expect(user?.password).not.toEqual(password);
  })

  afterAll(async () => {
    await dbTeardown(); // Clean up database after all tests
  });
});
