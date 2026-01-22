export interface IProject {
  name: string;
  description?: string;
  status: "ACTIVE" | "ARCHIVED" | "DELETED";
  isDeleted: boolean;
  createdBy: string;
}
