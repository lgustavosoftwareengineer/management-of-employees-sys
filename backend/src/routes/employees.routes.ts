import { Router } from "express";
import RoleController from "../controllers/RoleController";
import EmployeeController from "../controllers/EmployeeController";

const employeesRouter = Router();

employeesRouter.post("/v1/", EmployeeController.create);
employeesRouter.get("/v1/:id", EmployeeController.show);
employeesRouter.get("/v1/", EmployeeController.index);
employeesRouter.put("/v1/:id", EmployeeController.update);
employeesRouter.delete("/v1/:id", EmployeeController.delete);

export default employeesRouter;
