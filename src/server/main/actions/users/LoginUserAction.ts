import { User } from "../../domain/users/User";
import { UserRepository } from "../../domain/users/UserRepository";
import bcrypt from "bcrypt";

export class LoginUserAction {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(data: ActionData): Promise<User> {

    if (this.checkUserAdmin(data)) {
      return this.getAdminUser();
    }

    const user = await this.userRepository.getByUsername(data.username);

    if (!user) {
      throw new Error("invalid user");
    }

    if (user.reset === true) {
      user.password = "";
      return user;
    }

    if (!bcrypt.compareSync(data.password, user.password)) {
      throw new Error("invalid user");
    }

    return user;
  }

  private checkUserAdmin(data: ActionData): boolean {
    if (data.username === process.env.USER_ADMIN_USERNAME &&
      data.password === process.env.USER_ADMIN_PASSWORD) {
      return true;
    }
    return false;
  }

  private getAdminUser(): User {
    return {
      password: "",
      username: "",
      createdDate: new Date(),
      id: 0,
      reset: false
    }
  }
}

interface ActionData {
  username: string;
  password: string;
}