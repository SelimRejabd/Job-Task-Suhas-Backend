import express from "express";
import { ProjectControllers } from "./controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/constant";

const router = express.Router();

router
  .route("/")
  .post(auth(), ProjectControllers.create)
  .get(ProjectControllers.getAll);
router
  .route("/:id")
  .patch(auth(USER_ROLE.admin), ProjectControllers.update)
  .delete(auth(USER_ROLE.admin), ProjectControllers.softDelete);

export const ProjectRoutes = router;
