import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/userRouter";
import fileRoutes from "./routes/fileRouter";
import providerRoutes from "./routes/providerRouter";
import cors from "cors";
import path from "node:path";

const PORT = process.env.PORT || 3000;
AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );

  app.use(userRoutes);
  app.use(fileRoutes);
  app.use(providerRoutes);

  app.listen(PORT, () => {
    console.log("Server running on port 3002");
  });
});
