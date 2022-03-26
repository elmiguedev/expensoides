import { User } from "../../domain/users/User";
import { UserRepository } from "../../domain/users/UserRepository";

export class AddUserAction {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public execute(data: ActionData): Promise<User> {
    return this.userRepository.add({
      username: data.username,
      password: data.password
    })
  }
}

interface ActionData {
  username: string;
  password: string;
  passwordRepeat: string;
}