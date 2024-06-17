import exp from "constants";
import User from "../../database/models/User";

describe("Test User model", () => {
  test("Test User model", async () => {
    const user = await User.create({
      username: "test_number_1",
      email: "email@yahoo.com",
      password: "megaPassword",
    });

    expect(user.username).toBe("test_number_1");
})
})