
import Item from "../../app/database/models/Item";
import Role from "../../app/database/models/Role";
import User from "../../app/database/models/User";
import {connectDatabase, closeDatabase} from "../../app/utils/connect";

const dbTeardown = async () => {
  await Role.destroy({ cascade: true, truncate: true, force: true });
  await Item.destroy({ cascade: true, truncate: true, force: true });
  await User.destroy({ cascade: true, truncate: true, force: true });
  await closeDatabase();
};

describe("Test Database Models", () => {
  beforeAll(async () => {
    await connectDatabase(); // Initialize database connection

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
      Item.create({
        id: 1,
        name: "Box of Pencils",
        description: "A box of 100 pencils",
        price: 2.50,
        image: "https://e7.pngegg.com/pngimages/702/527/png-clipart-colored-pencil-crayon-boxed-color-pencil-png-material-color-splash.png",
      })
    ]);


  }, 25000); // Adding a timeout of 25 seconds

  beforeEach(async () => {
    jest.clearAllMocks();
    
    // Probably won't use it 
    
  }); 

  it("Test Role Creation and Getter", async () => {
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

  it("Test if item corresponds to the following model", async () => {
    const mockResponse = {
      id: 1,
      name: "Box of Pencils",
      description: "A box of 100 pencils",
      price: 2.50,
    }

    const result = await Item.findOne({
      where: { name: "Box of Pencils" },
    });

    expect(result?.id).toBe(mockResponse.id);
  });

  it("Test if user creation generates bcrypt or generate salt for passwords", async () => {

    const password = "password300"

    const user = await User.create({
      id: 1,
      username: "Test User",
      password: password,
      email: "test@gmail.com",
      roles: [1,2,3],
    });


    expect(user?.password).not.toEqual(password);
  })

  afterAll(async () => {
    await dbTeardown(); // Clean up database after all tests
  });
});
