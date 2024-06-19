import User from "../../database/models/User";

let user: User;
const password = "megaPassword";

describe("Test User model", () => {
  beforeAll(async () => {
    user = await User.create({
      username: "test_number_1",
      email: "email@yahoo.com",
      password: password,
    });
  });

  test("Test User creation, password should be encrypted", async () => {
    expect(user.username).toBe("test_number_1");
    expect(user.password).not.toBe(password);
  });

  test("User should have a cart created after creation", async () => {

  });
});
