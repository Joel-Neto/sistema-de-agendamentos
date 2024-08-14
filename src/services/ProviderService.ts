import { User } from "../entities/User";
import { userRepository } from "../repositories/userRepository";

export class ProviderService {
  async getAllProviders(): Promise<User[]> {
    return await userRepository.find({
      where: { provider: true },
      relations: ["avatar_id"],
    });
  }
}
