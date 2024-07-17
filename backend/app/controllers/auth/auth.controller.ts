import { Request, Response } from "express";
import User from "../../database/models/User";
import RefreshToken from "../../database/models/RefreshToken";
import logger from "../../utils/logger";
import bcrypt from "bcrypt";
import { generateToken, decodeJwt } from "../../utils/jwt";
import Context from "../../config/context/context.config";
import AuthConfig from "../../config/auth/auth.config";

import {usersKeys} from "../../config/cache/admin.redis";

import {setAsync, deleteKeysByPattern} from "../../utils/redis";

import format from "../../helpers/format";

const {formatUser} = format;

const {
  isProduction
} = Context;

const {jwtRefreshExpiration, jwtExpiration} = AuthConfig;

/**
 * Register a new user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const signUp = async (req: Request, res: Response) => {
  try {
    // Get req body
    const { username, password, email, name, age } = req.body;
    // Create the user
    const user = await User.create({
      username,
      password,
      email,
      name,
      age,
    });

    const newUser = await User.findOne({
      where: {
        id: user.id,
      },
      include: ["roles"],
      attributes: {
        exclude: ["password"],
      }
    });

    const cacheUser = formatUser(newUser!);

    // Delete all keys that start with "admin:"
    await deleteKeysByPattern("admin/users:*")
    
    const cacheKey = usersKeys.singleUser(newUser!.id);
     // Set user in cache
    await setAsync(cacheKey, JSON.stringify(cacheUser), 3600);


    res.status(201).send({
      message: `Successfully sign up, username: ${user.username}`,
    });
  } catch (err: any) {
    if (!res.headersSent) {
      res.status(400).send({
        message: err.message,
      });
    }

    logger.error(err);
  }
};

/**
 * Log in a user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const signIn = async (req: Request, res: Response) => {
  try {
    // Get req body
    const { username, password, email } = req.body;
    // Find user
    const foundUser = await User.findOne({
      where: {
        [(username && "username") || (email && "email")]: username || email,
      },
      include: ["roles"],
    });
    // If no user found, return
    if (!foundUser) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    // Compare passwords using bcrypt
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser!.password
    );

    // If passwords don't match
    if (!isPasswordCorrect) {
      return res.status(401).send({
        message: "Invalid credentials",
      });
    }
    // Map roles into an array of Strings
    const roles = foundUser!.roles.map((role) => role.name);
    // Generate access token
    const token = generateToken(foundUser!, roles);

    // Set JWT in an HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true, // avoids XSS attacks  (not accesible through javascript)
      secure: isProduction, // ensure the cookie is only sent through https
      sameSite: "strict", // helps mitigate CSRF attacks
      maxAge: jwtExpiration,
    });

    // Create RefreshToken in the database
    const refreshToken = await RefreshToken.createToken(foundUser!);

    // Set RefreshToken in a HTTP-only Cookie
    res.cookie("refreshToken", refreshToken.token, {
      httpOnly: true, // avoids XSS attacks  (not accesible through javascript)
      secure: isProduction, // ensure the cookie is only sent through https
      sameSite: "strict", // helps mitigate CSRF attacks
      maxAge: jwtRefreshExpiration,
    });

    res.status(200).send({
      message: "User authenticated",
    });
  } catch (err: any) {
    if (!res.headersSent) {
      res.status(500).send({
        message: err.message,
      });
    }
  }
};

/**
 * Refresh the JWT access token using the refresh token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const refreshToken = async (req: Request, res: Response) => {
  try {
    const { id } = req.user!;

    const user = await User.findOne({
      where: {
        id,
      },
      include: ["roles"],
    });

    // If no user found
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    // Map roles into an array of Strings 
    const roles = user!.roles.map((role) => role.name);

    // Generate new access token
    const token = generateToken(user!, roles);

    // Set JWT in an HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true, // avoids XSS attacks  (not accesible through javascript)
      secure: isProduction, // ensure the cookie is only sent through https
      sameSite: "strict", // helps mitigate CSRF attacks
      maxAge: jwtExpiration,
    });

    // Send message
    res.status(200).send({
      message: "Token refreshed",
    });
  } catch (err: any) {
    if (!res.headersSent) {
      res.status(500).send({
        message: err.message,
      });
    }
    logger.error(err);
  }
};

/**
 * Decodes a JWT token and sends the decoded payload in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
const decodedToken = async (req: Request, res: Response) => {
  try {
    const { jwt } = req.cookies;
    const decoded = decodeJwt(jwt);

    res.status(200).send({
      user: decoded,
    });
  } catch (err: any) {
    if (!res.headersSent) {
      res.status(500).send({
        message: err.message,
      });
    }
    logger.error(err);
  }
};

export {
  signUp as signUpController,
  signIn as signInController,
  refreshToken as refreshTokenController,
  decodedToken as decodedTokenController,
};
