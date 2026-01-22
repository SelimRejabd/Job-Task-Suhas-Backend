import { PROJECT_STATUS } from "./constant";

export interface IProject {
  name: string;
  description?: string;
  status: TProjectStatus;
  isDeleted: boolean;
  createdBy: string;
}

export type TProjectStatus =
  (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];
