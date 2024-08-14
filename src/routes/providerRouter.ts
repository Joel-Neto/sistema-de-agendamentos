import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth";
import { ProviderController } from "../controllers/ProviderController";

const routes = Router();
const providerController = new ProviderController();

routes.use(authMiddleware);

routes.get("/providers", providerController.getProviders);

export default routes;
