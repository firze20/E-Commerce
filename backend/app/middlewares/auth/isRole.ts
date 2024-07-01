import { Request, Response, NextFunction } from "express";
/**
 * Middleware to check if the user has admin privileges.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {void} - Calls the next middleware if the user is an admin, otherwise sends a 403 response.
 */
const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && req.user.roles && req.user.roles.includes("Admin")) {
    next();
  } else {
    res
      .status(403)
      .send({ message: "You don't have permission to access this route" });
  }
};
/**
 * Middleware to check if the user has manager or admin privileges.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {void} - Calls the next middleware if the user is an admin or manager, otherwise sends a 403 response.
 */
const isManager = (req: Request, res: Response, next: NextFunction): void => {
  if (
    req.user &&
    req.user.roles &&
    (req.user.roles.includes("Admin") || req.user.roles.includes("Manager"))
  ) {
    next();
  } else {
    res
      .status(403)
      .send({ message: "You don't have permission to access this route" });
  }
};

export { isManager, isAdmin };
