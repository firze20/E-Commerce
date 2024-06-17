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
    const token = jwt.sign({ id: user.id, roles}, jwtSecret, { expiresIn: "1h" });
    return token;
};

/**
 * Generates a JWT refresh token for a user.
 * @param {User} user - The user object.
 * @returns {string} The generated JWT refresh token.
 */
const generateRefreshToken = (user: User): string => {
    const refreshToken = jwt.sign({ id: user.id }, refreshTokenSecret, { expiresIn: "7d" });
    return refreshToken;
};

/**
 * Generates a JWT refresh token for a user.
 * @param {id} number - The user object.
 * @param {expiresIn} string (optional)
 * @returns {string} The generated JWT refresh token.
 */
const generateRefreshTokenForTesting = (id: number, expiresIn?: string): string => {
    const refreshToken = jwt.sign({ id }, refreshTokenSecret, { expiresIn });
    return refreshToken;
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
    console.log(refreshToken);
    console.log(refreshTokenSecret);
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


export { generateToken, generateRefreshToken, decodeJwtRefreshToken, isJwtPayload };


