import RefreshToken from "../../database/models/RefreshToken";
import User from "../../database/models/User";

describe("Test if there is no multiple refresh tokens for the same user", () => {
  test("Creating various instances of refresh token, and expecting just 1 in the FindAll query", async () => {
    const user = await User.findOne();

    // Creating multiple tokens for the same user

     // Creating multiple tokens sequentially
     await RefreshToken.createToken(user!);
     await RefreshToken.createToken(user!);
     await RefreshToken.createToken(user!);
    
     // Should expect only 1 
    const refreshTokens = await RefreshToken.findAll({ where: { userId: user!.id } });

    expect(refreshTokens.length).toBe(1);
})
})