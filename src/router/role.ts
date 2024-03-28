import { Router } from "express";
import rolehandler from "../handlers/role";

const roles = Router();

roles.get("/", rolehandler.getRolesHandler);
roles.get("/:id", rolehandler.getRoleByIdHandler);
roles.post("/", rolehandler.createRoleHandler);
roles.put("/:id", rolehandler.updateRoleHandler);
roles.delete("/:id", rolehandler.destroyRoleHandler);

export default roles;
