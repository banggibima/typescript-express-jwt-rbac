import express from "express";
import morgan from "morgan";
import cookieparser from "cookie-parser";
import addresss from "./router/address";
import profiles from "./router/profile";
import roles from "./router/role";
import users from "./router/user";
import userhandler from "./handlers/user";

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(morgan("dev"));

const auth = express.Router();

auth.post("/login", userhandler.loginHandler);
auth.post("/register", userhandler.registerHandler);
auth.post("/logout", userhandler.logoutHandler);

app.use("/api", auth);
app.use("/api/addresses", addresss);
app.use("/api/profiles", profiles);
app.use("/api/roles", roles);
app.use("/api/users", users);

export default app;
