// Mostly used for RefreshToken, passport js already handles jwt access Token
import User from "../database/models/User";
import jwt from "jsonwebtoken";
// Config Auth
import Config from "../config/auth/auth.config"; 

const { jwtSecret, refreshTokenSecret } = Config;

/**
 * Generates a JWT access token for a user.
 * @param {User} user - The user object.
 * @param {string[]} roles - Array of roles associated with the user.
 * @returns {string} The generated JWT access token.
 */
const generateToken = (user: User, roles: string[]): string => {
    const token = jwt.sign({ id: user.id, name: user.name, roles}, jwtSecret, { expiresIn: "1h" });
    return token;
};

/**
 * Generates a JWT refresh token for a user.
 * @param {User} user - The user object.
 * @param {string} expires (optional)
 * @returns {string} The generated JWT refresh token.
 */
const generateRefreshToken = (user: User, expires?: string): string => {
    const options = expires ? { expiresIn: expires } : { expiresIn: "7d" };
    const refreshToken = jwt.sign({ id: user.id }, refreshTokenSecret, options);
    return refreshToken;
};

/**
 * Decodes a JSON Web Token (JWT) and returns the decoded payload.
 * @param token - The JWT to decode.
 * @returns The decoded payload if the JWT is valid, otherwise returns a string indicating an error.
 */
const decodeJwt = (token: string): string | jwt.JwtPayload => {
    return jwt.verify(token, jwtSecret);
};

/**
 * Decodes and verifies a JWT refresh token.
 * @param {string} refreshToken - The JWT refresh token to decode and verify.
 * @returns {string | jwt.JwtPayload} The decoded JWT payload.
 * @throws {jwt.JsonWebTokenError} If the token is invalid.
 * @throws {jwt.TokenExpiredError} If the token has expired.
 * @throws {jwt.NotBeforeError} If the token is not active yet.
 */
const decodeJwtRefreshToken = (refreshToken: string): string | jwt.JwtPayload => {
    return jwt.verify(refreshToken, refreshTokenSecret);
};

/**
 * Type guard to check if the decoded JWT is a payload object.
 * @param {string | jwt.JwtPayload} decoded - The decoded JWT.
 * @returns {decoded is jwt.JwtPayload} True if the decoded JWT is a payload object, false otherwise.
 */
const isJwtPayload = (decoded: string | jwt.JwtPayload): decoded is jwt.JwtPayload => {
    return typeof decoded === 'object' && decoded !== null;
  };


export { generateToken, generateRefreshToken, decodeJwtRefreshToken, isJwtPayload, decodeJwt };


