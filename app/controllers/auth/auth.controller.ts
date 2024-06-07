import { Request, Response } from "express";
import User from "../../database/models/User";
import RefreshToken from "../../database/models/RefreshToken";
import logger from "../../utils/logger";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";

const signUp = async (req: Request, res: Response) => {
  try {
    const { username, password, email, name, age } = req.body;
    const user = await User.create({
      username,
      password,
      email,
      name,
      age,
    });

    if(req.roles) {
      const rolesToAssign = req.roles.map(role => role.name);
      user.addRoles(rolesToAssign);
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
        },
        include: ["roles"],
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

    const roles = foundUser!.roles.map(role => role.name);

    const token = generateToken(foundUser!, roles);

    // Set JWT in an HTTP-only cookie
    res.cookie('jwt', token, {
        httpOnly: true, // avoids XSS attacks  (not accesible through javascript)
        secure: process.env.NODE_ENV === "production", // ensure the cookie is only sent through https
        sameSite: "strict", // helps mitigate CSRF attacks 
        maxAge: 3600000,
    })

    res.status(200).send({
        message: "User authenticated",
    })

  } catch (err: any) {
    if (!res.headersSent) {
      res.status(500).send({
        message: err.message,
      });
    }
  }
};

export { signUp as signUpController, signIn as signInController };
