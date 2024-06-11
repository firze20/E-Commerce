import User from "../database/models/User";
import jwt from "jsonwebtoken";

const generateToken = (user: User, roles: string[]) => {
    const token = jwt.sign({ id: user.id, roles}, process.env.JWT_SECRET as string, { expiresIn: "1h" });
    return token;
};

const generateRefreshToken = (user: User) => {
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET as string, { expiresIn: "7d" });
    return refreshToken;
};


export { generateToken, generateRefreshToken };

