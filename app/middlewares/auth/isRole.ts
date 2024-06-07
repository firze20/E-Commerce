import { Request, Response, NextFunction } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.roles && req.user.roles.includes("Admin")) {
    next();
  } else {
    res
      .status(403)
      .send({ message: "You don't have permission to access this route" });
  }
};

const isManager = (req: Request, res: Response, next: NextFunction) => {
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
