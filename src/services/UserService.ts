import { User } from "../entities/User";
import { userRepository } from "../repositories/userRepository";

export class UserService {
  async getAllUsers(): Promise<User[]> {
    return await userRepository.find();
  }

  async getUserById(id: string): Promise<User | null> {
    return await userRepository.findOneBy({ id });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await userRepository.findOneBy({ email });
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    provider: boolean
  ): Promise<User> {
    const user = userRepository.create({ name, email, password, provider });
    return await userRepository.save(user);
  }

  async updateUser(user: User): Promise<User> {
    return await userRepository.save(user);
  }
}
