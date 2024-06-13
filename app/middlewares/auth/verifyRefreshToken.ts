// verifyRefreshToken.ts

import { Request, Response, NextFunction } from "express";

import RefreshToken from "../../database/models/RefreshToken"; 

import { isJwtPayload, decodeJwtRefreshToken } from "../../utils/jwt";

export const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies?.refreshToken;


  // If no refresh token in req.cookies
  if (!refreshToken) {
    return res.status(401).send({ message: 'No refresh token provided.' });
  }

  try {
    // Decode the refreshToken
    const decoded = decodeJwtRefreshToken(refreshToken);

    // Ensure is decoded
    if (!isJwtPayload(decoded)) {
      return res.status(401).send({ message: 'Invalid refresh token.' });
    }

    // Find the refresh token in the database
    const refreshTokenRecord = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });

    // If refresh token is not found, return 401
    if (!refreshTokenRecord) {
      return res.status(401).send({ message: 'Invalid refresh token.' });
    }
    // If its expired, return 401
    if(RefreshToken.verifyExpiration(refreshTokenRecord)) {
      return res.status(401).send({ message: 'Refresh token has expired.' });
    }

    // Attach decoded token data to the request object
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (err) {
    return res.status(401).send({ message: 'Invalid refresh token.' });
  }
};
