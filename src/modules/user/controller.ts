import catchAsync from "../../utils/catchAsync";
import { UserService } from "./service";
import apiResponse from "../../utils/apiResponse";

const create = catchAsync(async (req, res) => {
  const userData = req.body;
  const data = await UserService.create(userData);
  apiResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully",
    data,
  });
});

const registerByLink = catchAsync(async (req, res) => {
  const payload = req.body;
  const data = await UserService.registerByLink(payload);
  apiResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data,
  });
});

const getAll = catchAsync(async (req, res) => {
  const { data, meta } = await UserService.getAll(req.query);
  apiResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data,
    meta,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await UserService.getById(id);
  apiResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data,
  });
});

const statusUpdate = catchAsync(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const result = await UserService.statusUpdate(id, status);

  apiResponse(res, {
    statusCode: 200,
    success: true,
    message: "User status updated successfully",
    data: result,
  });
});

const roleUpdate = catchAsync(async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;
  const result = await UserService.roleUpdate(id, role);

  apiResponse(res, {
    statusCode: 200,
    success: true,
    message: "User role updated successfully",
    data: result,
  });
});

export const UserController = {
  create,
  getAll,
  getById,
  statusUpdate,
  roleUpdate,
  registerByLink,
};
