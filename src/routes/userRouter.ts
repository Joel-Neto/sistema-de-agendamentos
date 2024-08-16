import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth";
import { validate } from "../middlewares/validation";
import {
  createUserSchema,
  sessionSchema,
  updateUserSchema,
} from "../validations/user.validation";

const routes = Router();
const userController = new UserController();

routes.post("/users", validate(createUserSchema), userController.createUser);
routes.post("/users/login", validate(sessionSchema), userController.login);

routes.use(authMiddleware);

routes.put("/users", validate(updateUserSchema), userController.updateUser);

export default routes;
