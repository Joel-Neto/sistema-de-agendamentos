import { File } from "./../entities/File";
import { fileRepositpry } from "./../repositories/fileRepository";

export class FileService {
  //   async getAllUsers(): Promise<User[]> {
  //     return await userRepository.find();
  //   }

  //   async getUserById(id: string): Promise<User | null> {
  //     return await userRepository.findOneBy({ id });
  //   }

  //   async getUserByEmail(email: string): Promise<User | null> {
  //     return await userRepository.findOneBy({ email });
  //   }

  async createFile(name: string, path: string): Promise<File> {
    const file = fileRepositpry.create({ name, path });
    return await fileRepositpry.save(file);
  }

  //   async updateUser(user: User): Promise<User> {
  //     return await userRepository.save(user);
  //   }
}
