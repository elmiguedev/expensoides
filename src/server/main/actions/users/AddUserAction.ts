import { User } from "../../domain/users/User";
import { UserRepository } from "../../domain/users/UserRepository";

export class AddUserAction {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(data: ActionData): Promise<User> {
    console.log("LA DATA", data);
    if (data.password !== data.passwordRepeat) {
      throw new Error("Passwords are distict");
    }

    console.log("pasa la validacoin", data.password);

    const newPassword = await this.userRepository.generatePassword(data.password);
    console.log("la nueva clave", newPassword);
    return this.userRepository.add({
      username: data.username,
      password: newPassword,
      reset: false,
      createdDate: new Date()
    })
  }
}

interface ActionData {
  username: string;
  password: string;
  passwordRepeat: string;
}