import { Request, Response } from "express";
import { FileService } from "../services/FileService";
import SendResponse from "../utils/SendResponse";

const fileService = new FileService();

export class FileController {
  async create(req: Request, res: Response) {
    const originalName = req.file?.originalname;
    const fileName = req.file?.filename;
    const filePath = `http://localhost:3002/files/${fileName}`;
    try {
      const newFile = await fileService.createFile(
        originalName as string,
        filePath
      );

      return SendResponse.success(
        res,
        201,
        "Arquivo criado com sucesso.",
        newFile
      );
    } catch (error) {
      return SendResponse.error(res, 500, "Erro interno do servidor.");
    }
  }
}
