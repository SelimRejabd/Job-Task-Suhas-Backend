import express from "express";
import { UserController } from "./controller";
import { USER_ROLE } from "./constant";
import auth from "../../middleware/auth";

const router = express.Router();

router
  .route("/")
  .post(UserController.create)
  .get(auth(USER_ROLE.admin), UserController.getAll);
router.route("/:id").get(UserController.getById);
router
  .route("/:id/status")
  .patch(auth(USER_ROLE.admin), UserController.statusUpdate);
router
  .route("/:id/role")
  .patch(auth(USER_ROLE.admin), UserController.roleUpdate);

export const UserRoutes = router;
