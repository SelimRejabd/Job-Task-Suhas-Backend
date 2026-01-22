import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../user/type";

interface IUserDoc extends Document, IUser {}

const userSchema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "MANAGER", "STAFF"], required: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], required: true },
    invitedAt: { type: Date },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUserDoc>("User", userSchema);
