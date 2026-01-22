import mongoose, { Schema, Document } from "mongoose";
import { IInvite } from "./type";
interface IInviteDoc extends Document, IInvite {}

const inviteSchema = new Schema<IInviteDoc>(
  {
    email: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "MANAGER", "STAFF"], required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    acceptedAt: { type: Date },
  },
  { timestamps: true },
);
export const Invite = mongoose.model<IInvite>("Invite", inviteSchema);
