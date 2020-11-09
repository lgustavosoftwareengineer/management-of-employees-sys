import { Router } from "express";
import employeesRouter from "./employees.routes";
import rolesRouter from "./roles.routes";

const routes = Router();

routes.use("/roles", rolesRouter);

routes.use("/employees", employeesRouter);

export default routes;
