import { Request, Response, NextFunction } from "express";

/**
 * Middleware to validate the email address in the request body.
 * If the email is invalid, it sends a 400 response with an error message.
 * Otherwise, it calls the next middleware in the chain.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const isValidEmail = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;

  if (!email || !emailRegex.test(email)) {
    res.status(400).send({ message: "Invalid email address" });
  } else {
    next();
  }
};

export { isValidEmail };
