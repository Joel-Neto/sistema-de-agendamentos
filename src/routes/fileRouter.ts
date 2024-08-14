import { Router } from "express";
import upload from "../utils/multer";
import { FileController } from "../controllers/FileController";
import { authMiddleware } from "../middlewares/auth";

const routes = Router();
const fileController = new FileController();

routes.use(authMiddleware);
routes.post("/files", upload.single("file"), fileController.create);

export default routes;
