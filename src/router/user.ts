import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import userhandler from "../handlers/user";

const users = Router();

users.use(authenticate);

users.get("/", authorize(["admin"]), userhandler.getUsersHandler);
users.get("/:id", authorize(["admin"]), userhandler.getUserByIdHandler);
users.post("/", authorize(["admin"]), userhandler.createUserHandler);
users.put("/:id", authorize(["admin"]), userhandler.updateUserHandler);
users.delete("/:id", authorize(["admin"]), userhandler.destroyUserHandler);

export default users;
