import { Router } from "express";
import userRoute from "../user/user.routes";

const routes = Router();

routes.use("/auth", userRoute);

export default routes;
