import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { PROJECT_STATUS } from "./constant";
import { Project } from "./model";
import { IProject, TProjectStatus } from "./type";

const create = async (payload: IProject, userId: string) => {
  const data = await Project.create({ ...payload, createdBy: userId });
  if (!data) {
    throw new AppError("Failed to create project", 500);
  }
  return data;
};

const getAll = async (query: Record<string, unknown>) => {
  const dataQuery = new QueryBuilder(
    Project.find({ isDeleted: { $ne: true } }),
    query,
  )
    .sort()
    .fields();
  await dataQuery.paginate();
  const data = await dataQuery.modelQuery;
  const meta = await dataQuery.getMeta();
  if (!data) {
    throw new AppError("No Projects found", 404);
  }
  return { data, meta };
};

const update = async (projectId: string, payload: Partial<IProject>) => {
  const data = await Project.findByIdAndUpdate(projectId, payload, {
    new: true,
  });
  if (!data) {
    throw new AppError("Project not found", 404);
  }
  return data;
};

const softDelete = async (projectId: string) => {
  const data = await Project.findByIdAndUpdate(
    projectId,
    { isDeleted: true },
    { new: true },
  );
  if (!data) {
    throw new AppError("Project not found", 404);
  }
  return data;
};

export const ProjectServices = {
  create,
  getAll,
  update,
  softDelete,
};
