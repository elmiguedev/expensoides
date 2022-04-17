import { User } from "../../domain/users/User";
import { UserRepository } from "../../domain/users/UserRepository";
import bcrypt from "bcrypt";

export class LoginUserAction {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(data: ActionData): Promise<User> {
    const user = await this.userRepository.getByUsername(data.username);

    if (!user) {
      throw new Error("invalid user");
    }

    if (!bcrypt.compareSync(data.password, user.password)) {
      throw new Error("invalid user");
    }

    return user;
  }
}

interface ActionData {
  username: string;
  password: string;
}