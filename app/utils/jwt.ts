import User from "../database/models/User";
import jwt from "jsonwebtoken";

const generateToken = (user: User, roles: string[]) => {
    const token = jwt.sign({ id: user.id, roles}, process.env.JWT_SECRET as string, { expiresIn: "1h" });
    return token;
};

export { generateToken };

