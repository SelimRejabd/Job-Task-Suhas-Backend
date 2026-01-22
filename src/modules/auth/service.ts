import { config } from "../../config";
import AppError from "../../errors/AppError";
import { IUser, User } from "../user";
import { USER_STATUS } from "../user/constant";
import { ILoginPayLoad } from "./type";
import bcrypt from "bcrypt";
import { createToken } from "./utils";

const register = async (payload: IUser) => {
  const jwtPayload = {
    email: payload.email,
    role: payload.role,
  };

  const data = await User.create(payload);
  if (!data) {
    throw new AppError("Failed to register user", 500);
  }
  return data;
};

const login = async (payload: ILoginPayLoad) => {
  const data = await User.findOne({
    email: payload.email,
  });
  if (!data) {
    throw new AppError("Invalid email or password", 401);
  }
  if (data.status === USER_STATUS.inactive) {
    throw new AppError("User is inactive", 403);
  }
  const decodedPassword = await bcrypt.compare(payload.password, data.password);
  if (!decodedPassword) {
    throw new AppError("Invalid email or password", 401);
  }
  const jwtPayload = {
    id: data.id,
    email: data.email,
    role: data.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret_key as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret_key as string,
    config.jwt_refresh_expires_in as string,
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  login,
  register,
};
