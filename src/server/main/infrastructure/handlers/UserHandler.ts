import { Request, Response } from "express";
import { AddUserAction } from "../../actions/users/AddUserAction";
import { GetUsersAction } from "../../actions/users/GetUsersAction";

export class UserHandler {
  constructor(
    private readonly getUsersAction: GetUsersAction,
    private readonly addUserAction: AddUserAction,
  ) { }

  public async getUsers(req: Request, res: Response) {
    try {
      const users = await this.getUsersAction.execute();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  public async addUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      console.log("entra al controlador", userData);
      const user = await this.addUserAction.execute(userData);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}