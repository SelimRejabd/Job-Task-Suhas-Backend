import apiResponse from "../../utils/apiResponse";
import catchAsync from "../../utils/catchAsync";
import { ProjectServices } from "./service";

const create = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const project = req.body;

  const result = await ProjectServices.create(project, userId);

  apiResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ProjectServices.getAll(query);
  apiResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ProjectServices.update(id, payload);
  apiResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

const softDelete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.softDelete(id);
  apiResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

export const ProjectControllers = {
  create,
  getAll,
  update,
  softDelete,
};
