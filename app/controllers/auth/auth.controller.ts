import { Request, Response } from "express";
import User from "../../database/models/User";
import Role from "../../database/models/Role";
import logger from "../../utils/logger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req: Request, res: Response) => {
  try {
    const { username, password, email, name, age, roles } = req.body;
    const user = await User.create({
      username,
      password,
      email,
      name,
      age,
    });

    if (roles) {
      const findRoles = await Role.findAll({
        where: {
          name: roles,
        },
      });

      if (findRoles) {
        user.addRoles(roles);
      }
    }

    logger.info(`User ${user.username} created!`);

    res.status(201).send({
      message: "User created!",
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

const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    const foundUser = await User.findOne({
        where: {
            [username && "username" || email && "email"]: username || email,
        }
    })

    if(!foundUser){
        res.status(404).send({
            message: "User not found"
        })
    };

    // Compare passwords using bcrypt
    const isPasswordCorrect = await bcrypt.compare(password, foundUser!.password);

    if(!isPasswordCorrect) {
        res.status(401).send({
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign({ id: foundUser!.id}, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    // Set JWT in an HTTP-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
    })

    res.status(200).send({
        message: "User authenticated",
    })

  } catch (err: any) {}
};

export { signUp as signUpController, signIn as signInController };
