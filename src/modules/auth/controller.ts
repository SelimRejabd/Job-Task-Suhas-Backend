import apiResponse from "../../utils/apiResponse";
import catchAsync from "../../utils/catchAsync";
import { cookieOptions } from "./constant";
import { AuthServices } from "./service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);
  const { accessToken, refreshToken } = result;

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  apiResponse(res, {
    statusCode: 200,
    success: true,
    message: "User login successful.",
    data: {
      accessToken,
    },
  });
});

export const AuthControllers = {
  loginUser,
};
