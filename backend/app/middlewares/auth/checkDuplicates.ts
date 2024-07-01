import { Request, Response, NextFunction } from "express";

import User from "../../database/models/User";

const checkDuplicateUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body;

  try {
    const existingUsername = await User.findOne({
      where: { username },
    });

    if (existingUsername) {
      return res.status(400).send({
        message: "Username is already in use",
      });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

const checkDuplicateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const existingEmail = await User.findOne({
      where: { email },
    });

    if (existingEmail) {
      return res.status(400).send({
        message: "Email is already in use",
      });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

export { checkDuplicateUsername, checkDuplicateEmail };
