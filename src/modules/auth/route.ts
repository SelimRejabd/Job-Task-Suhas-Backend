import { Router } from "express";
import { AuthControllers } from "./controller";

const router = Router();

router.post("/login", AuthControllers.loginUser);

export const AuthRoutes = router;
