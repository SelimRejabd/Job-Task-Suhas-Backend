import QueryBuilder from "../../builder/QueryBuilder";
import { config } from "../../config";
import AppError from "../../errors/AppError";
import { USER_ROLE, USER_STATUS } from "./constant";
import { User } from "./model";
import { IUser, TUserRole, TUserStatus } from "./type";
import jwt, { JwtPayload } from "jsonwebtoken";

const create = async (userData: IUser) => {
  const data = await User.create(userData);
  if (!data) {
    throw new AppError("Failed to create user", 500);
  }
  return data;
};

const registerByLink = async (payload: IUser & { token: string }) => {
  const decoded = jwt.verify(
    payload.token,
    config.invite_secret as string,
  ) as JwtPayload;

  if (!decoded || !decoded.email || !decoded.role || !decoded.iat) {
    throw new AppError("Invalid invite token", 400);
  }

  const inviteExpiresInSeconds = Number(config.invite_expires);
  const expiresAt = (decoded?.iat + inviteExpiresInSeconds) * 1000;

  if (Date.now() > expiresAt) {
    throw new AppError("Invite link has expired", 400);
  }

  const userData = {
    name: payload.name,
    password: payload.password,
    email: decoded.email,
    role: decoded.role,
    invitedAt: decoded.iat,
  };
  const data = await User.create(userData);
  if (!data) {
    throw new AppError("Failed to create user", 500);
  }
  return data;
};

const getAll = async (query: Record<string, unknown>) => {
  const dataQuery = new QueryBuilder(User.find(), query).sort().fields();
  await dataQuery.paginate();
  const data = await dataQuery.modelQuery;
  const meta = await dataQuery.getMeta();
  if (!data) {
    throw new AppError("No Users found", 404);
  }
  return { data, meta };
};

const getById = async (id: string) => {
  const data = await User.findById(id);
  if (!data) {
    throw new AppError("User not found", 404);
  }
  return data;
};

const statusUpdate = async (userId: string, status: TUserStatus) => {
  if (!Object.values(USER_STATUS).includes(status)) {
    throw new AppError("Invalid user status", 400);
  }
  const data = await User.findByIdAndUpdate(userId, { status }, { new: true });
  if (!data) {
    throw new AppError("User not found", 404);
  }
  return data;
};

const roleUpdate = async (userId: string, role: TUserRole) => {
  if (!Object.values(USER_ROLE).includes(role)) {
    throw new AppError("Invalid user role", 400);
  }
  const data = await User.findByIdAndUpdate(userId, { role }, { new: true });
  if (!data) {
    throw new AppError("User not found", 404);
  }
  return data;
};

export const UserService = {
  create,
  getAll,
  getById,
  statusUpdate,
  roleUpdate,
  registerByLink,
};
