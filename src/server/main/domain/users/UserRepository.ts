import { User } from "./User";

export interface UserRepository {
  add(user: User): Promise<User>;
  updatePassword(user: User): Promise<User>;
  generatePassword(password: string): Promise<string>;
  getByUsername(username: string): Promise<User>;
}