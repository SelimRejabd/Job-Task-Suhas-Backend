import { Router } from "express";
import { UserRoutes } from "../modules/user/routes";
import { AuthRoutes } from "../modules/auth/route";
import { ProjectRoutes } from "../modules/project/route";
import { InviteRoutes } from "../modules/invite/route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },
  {
    path: "/invites",
    route: InviteRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
