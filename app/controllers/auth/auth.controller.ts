import { Request, Response } from "express";
import User from "../../database/models/User";
import Role from "../../database/models/Role";
import logger from "../../utils/logger";

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

export { signUp as signUpController };