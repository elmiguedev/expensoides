import { User } from "../../domain/users/User";
import { UserRepository } from "../../domain/users/UserRepository";

export class ResetUserAction {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(data: ActionData): Promise<User> {
    if (data.password !== data.passwordRepeat) {
      throw new Error("Passwords are distict");
    }

    const newPassword = await this.userRepository.generatePassword(data.password);
    return this.userRepository.updatePassword({
      id: data.id,
      username: data.username,
      password: newPassword
    })
  }
}

interface ActionData {
  id: number;
  username: string;
  password: string;
  passwordRepeat: string;
}