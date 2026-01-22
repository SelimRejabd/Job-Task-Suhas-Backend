import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../user/type";
import { USER_ROLE, USER_STATUS } from "./constant";
import bcrypt from "bcrypt";
import { config } from "../../config";

interface IUserDoc extends Document, IUser {}

const userSchema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(USER_ROLE), required: true },
    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.active,
    },
    invitedAt: { type: Date },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds) || 10,
  );
  next();
});

export const User = mongoose.model<IUserDoc>("User", userSchema);
