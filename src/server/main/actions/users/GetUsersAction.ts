import { User } from "../../domain/users/User";
import { UserRepository } from "../../domain/users/UserRepository";

export class GetUsersAction {
  constructor(private readonly userRepository: UserRepository) { }

  public async execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}