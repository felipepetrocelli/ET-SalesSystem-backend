import { Router } from "express";
import authRouter from "../../modules/auth/routes/auth.routes";
import customerRouter from "../../modules/customer/routes/customer.routes";
import usersRouter from "../../modules/users/routes/user.routes";
import isAuthenticated from "../middleware/isAuthenticated";

const routes = Router()

//routes.use("/users", isAuthenticated, usersRouter)
routes.use("/users", usersRouter)
routes.use("/customer", customerRouter)
routes.use("/auth", authRouter)

export default routes