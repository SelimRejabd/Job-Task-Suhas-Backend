import { config } from "../../config";
import AppError from "../../errors/AppError";
import { createToken } from "../auth/utils";
import { USER_ROLE, USER_STATUS } from "../user/constant";
import { Invite } from "./model";
import { IInvite } from "./type";

const create = async (payload: IInvite) => {
  if (!payload.email || !payload.role) {
    throw new AppError("Email and role are required to send an invite", 400);
  }

  if (!Object.values(USER_ROLE).includes(payload?.role)) {
    throw new AppError("Invalid user role", 400);
  }
  const jwtPayload = {
    email: payload.email,
    role: payload.role,
  };

  const token = createToken(
    jwtPayload,
    config.invite_secret as string,
    config.invite_expires as string,
  );
  const data = await Invite.create({ ...payload, token });
  if (!data) {
    throw new AppError("Failed to send invite", 500);
  }

  return data;
};

export const InviteServices = {
  create,
};
