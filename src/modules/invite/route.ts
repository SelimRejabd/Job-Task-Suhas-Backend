import express from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/constant";
import { InviteControllers } from "./controller";

const router = express.Router();

router.route("/").post(auth(USER_ROLE.admin), InviteControllers.create);

export const InviteRoutes = router;
