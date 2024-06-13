// Mostly used for RefreshToken, passport js already handles jwt access Token
import User from "../database/models/User";
import jwt from "jsonwebtoken";


import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_SECRET as string;


// Generate Token
const generateToken = (user: User, roles: string[]) => {
    const token = jwt.sign({ id: user.id, roles}, jwtSecret, { expiresIn: "1h" });
    return token;
};

// Generate Refresh Token
const generateRefreshToken = (user: User) => {
    const refreshToken = jwt.sign({ id: user.id }, refreshTokenSecret, { expiresIn: "7d" });
    return refreshToken;
};

// Decode Refresh Token
const decodeJwtRefreshToken = (refreshToken: string) => {
    console.log(refreshToken);
    console.log(refreshTokenSecret);
    return jwt.verify(refreshToken, refreshTokenSecret);
};

// Type Guard check if its an object and not a string for RefreshToken
const isJwtPayload = (decoded: string | jwt.JwtPayload): decoded is jwt.JwtPayload => {
    return typeof decoded === 'object' && decoded !== null;
  };


export { generateToken, generateRefreshToken, decodeJwtRefreshToken, isJwtPayload };


