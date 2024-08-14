import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth";

const routes = Router();
const userController = new UserController();

routes.post("/users", userController.createUser);
routes.post("/users/login", userController.login);

routes.use(authMiddleware);

routes.put("/users", userController.updateUser);

export default routes;
