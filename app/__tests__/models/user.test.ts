import exp from "constants";
import User from "../../database/models/User";

describe("Test User model", () => {
  test("Test User creation, password shouldn't be the same as the payload", async () => {
    const password = "megaPassword"

    const user = await User.create({
      username: "test_number_1",
      email: "email@yahoo.com",
      password: password,
    });

    expect(user.username).toBe("test_number_1");

    expect(user.password).not.toBe(password)
})
})