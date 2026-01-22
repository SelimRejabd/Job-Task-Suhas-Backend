import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { User } from "./model";
import { IUser } from "./type";

const create = async (userData: IUser) => {
  const data = await User.create(userData);
  if (!data) {
    throw new AppError("Failed to create user", 500);
  }
  return data;
};

const getAll = async (query: Record<string, unknown>) => {
  const dataQuery = new QueryBuilder(User.find(), query).sort().fields();
  await dataQuery.paginate();
  const data = await dataQuery.modelQuery;
  const meta = await dataQuery.getMeta();
  if (!data) {
    throw new AppError("No Users found", 404);
  }
  return { data, meta };
};

const getById = async (id: string) => {
  const data = await User.findById(id);
  if (!data) {
    throw new AppError("User not found", 404);
  }
  return data;
};

export const UserService = {
  create,
  getAll,
  getById,
};
