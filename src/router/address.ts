import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import addresshandler from "../handlers/address";

const addresss = Router();

addresss.use(authenticate);

addresss.get("/", authorize(["admin"]), addresshandler.getAddressesHandler);
addresss.get("/:id", authorize(["admin"]), addresshandler.getAddressByIdHandler);
addresss.post("/", authorize(["admin"]), addresshandler.createAddressHandler);
addresss.put("/:id", authorize(["admin"]), addresshandler.updateAddressHandler);
addresss.delete("/:id", authorize(["admin"]), addresshandler.deleteAddressHandler);

export default addresss;
