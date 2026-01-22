import mongoose, { Schema, Document } from "mongoose";
import { IInvite } from "./type";
import { USER_ROLE } from "../user/constant";
interface IInviteDoc extends Document, IInvite {}

const inviteSchema = new Schema<IInviteDoc>(
  {
    email: { type: String, required: true },
    role: { type: String, enum: Object.values(USER_ROLE), required: true },
    token: { type: String, required: true },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    }, // Default to 1 day from now
    acceptedAt: { type: Date },
  },
  { timestamps: true },
);
export const Invite = mongoose.model<IInvite>("Invite", inviteSchema);
