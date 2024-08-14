import { AppDataSource } from "../data-source";
import { File } from "../entities/File";

export const fileRepositpry = AppDataSource.getRepository(File);
