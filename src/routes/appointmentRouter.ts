import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { AppointmentController } from "../controllers/AppointmentController";

const routes = Router();
const appointmentController = new AppointmentController();

routes.use(authMiddleware);

export default routes;
