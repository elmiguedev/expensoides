import { user } from "pg/lib/defaults";
import { ApiClient } from "./ApiClient";

export class UserService {
  constructor() {
  }

  static async getUsers() {
    const users = await ApiClient.get("/api/users");
    return users.data;
  }

  static async addUser(user) {
    try {
      const newUser = await ApiClient.post("/api/users", {
        username: user.username,
        password: user.password,
        passwordRepeat: user.password
      });
      console.log("EL USER", newUser)
      return newUser.data;
    } catch (error) {
      console.log(error);
    }
  }
}