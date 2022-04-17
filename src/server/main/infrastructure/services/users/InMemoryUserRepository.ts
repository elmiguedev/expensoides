import { User } from "../../../domain/users/User";
import { UserRepository } from "../../../domain/users/UserRepository";
import { InMemoryDb } from "../../db/InMemoryDb";
import bcrypt from "bcrypt";

export class InMemoryUserRepository implements UserRepository {

  public add(user: User): Promise<User> {
    user.id = InMemoryDb.getInstance().users.length + 1;
    user.createdDate = new Date();
    InMemoryDb.getInstance().users.push(user);
    return Promise.resolve(user);
  }

  public updatePassword(user: User): Promise<User> {
    const old = InMemoryDb.getInstance().users.find(u => u.id === user.id);
    old.username = user.username;
    old.password = user.password;
    old.reset = false;
    return Promise.resolve(old);
  }

  public generatePassword(password: string): Promise<string> {
    return this.hashPassword(password);
  }

  public getByUsername(username: string): Promise<User> {
    const user = InMemoryDb.getInstance().users.find(u => u.username === username);
    return Promise.resolve(user);
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }


}