import { Router } from "express";
import RoleController from "../controllers/RoleController";

const rolesRouter = Router();

rolesRouter.post("/v1/", RoleController.create);
rolesRouter.get("/v1/:id", RoleController.show);
rolesRouter.get("/v1/", RoleController.index);
rolesRouter.put("/v1/:id", RoleController.update);
rolesRouter.delete("/v1/:id", RoleController.delete);

export default rolesRouter;
