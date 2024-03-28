import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import profilehandler from "../handlers/profile";

const profiles = Router();

profiles.use(authenticate);

profiles.get("/", authorize(["admin", "developer"]), profilehandler.getProfilesHandler);
profiles.get("/:id", authorize(["admin", "developer"]), profilehandler.getProfileByIdHandler);
profiles.post("/", authorize(["admin", "developer"]), profilehandler.createProfileHandler);
profiles.put("/:id", authorize(["admin", "developer"]), profilehandler.updateProfileHandler);
profiles.delete("/:id", authorize(["admin", "developer"]), profilehandler.destroyProfileHandler);

export default profiles;
