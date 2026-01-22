import { USER_ROLE, USER_STATUS } from "./constant";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  status: TUserStatus;
  invitedAt?: Date;
}

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type TUserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
