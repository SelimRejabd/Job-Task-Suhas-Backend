import apiResponse from "../../utils/apiResponse";
import catchAsync from "../../utils/catchAsync";
import { InviteServices } from "./service";

const create = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await InviteServices.create(payload);

  apiResponse(res, {
    statusCode: 201,
    success: true,
    message: "Invitation sent successfully",
    data: result,
  });
});

export const InviteControllers = {
  create,
};
