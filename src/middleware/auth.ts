import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";

import { User } from "../modules/user/model";
import { USER_STATUS } from "../modules/user/constant";
import { TUserRole } from "../modules/user";
import { config } from "../config";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken || req.headers.authorization;

    if (!token) {
      throw new AppError("You are not authorized", 401);
    }
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret_key as string,
    ) as JwtPayload;

    const { email, role, iat } = decoded;

    const userData = await User.findOne({ email });
    if (!userData) {
      throw new AppError("Credential errors.", 403);
    }

    if (userData.status === USER_STATUS.inactive) {
      throw new AppError("This user is inactive.", 403);
    }

    // if (
    //   userData.passwordChangedAt &&
    //   User.isJWTIssuedBeforePasswordChanged(
    //     userData.passwordChangedAt,
    //     iat as number
    //   )
    // ) {
    //   throw new AppError( "Password is changed.Please login again.", 404);
    // }
    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError("You are not authorized", 401);
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
