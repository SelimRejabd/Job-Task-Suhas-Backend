import { Router } from "express";
import { AuthControllers } from "./controller";
import { InviteControllers } from "../invite/controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/constant";
import { UserController } from "../user/controller";

const router = Router();

router.post("/login", AuthControllers.loginUser);
router.post("/register-via-invite", UserController.registerByLink);
router.post("/invite", auth(USER_ROLE.admin), InviteControllers.create);

export const AuthRoutes = router;
