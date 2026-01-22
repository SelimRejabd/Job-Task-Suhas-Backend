import mongoose, { Schema, Document } from "mongoose";
import { IProject } from "./type";
import { PROJECT_STATUS } from "./constant";

interface IProjectDoc extends Document, IProject {}

const projectSchema = new Schema<IProjectDoc>(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: Object.values(PROJECT_STATUS),
      default: PROJECT_STATUS.active,
    },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: String, required: true },
  },
  { timestamps: true },
);

export const Project = mongoose.model<IProjectDoc>("Project", projectSchema);
