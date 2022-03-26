import { User } from "../../../domain/users/User";
import { UserRepository } from "../../../domain/users/UserRepository";
import { InMemoryDb } from "../../db/InMemoryDb";

export class InMemoryUserRepository implements UserRepository {

  public add(user: User): Promise<User> {
    user.id = InMemoryDb.getInstance().users.length + 1;
    user.createdDate = new Date();
    InMemoryDb.getInstance().users.push(user);
    return Promise.resolve(user);
  }
}