import { Column, Entity, getConnection, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../domain/users/User";
import { UserRepository } from "../../../domain/users/UserRepository";
import bcrypt from "bcrypt";

export class PostgresUserRepository implements UserRepository {

  public getAll(): Promise<User[]> {
    return this.getUserRepository().find();
  }

  public async add(user: User): Promise<User> {
    const newUser = await this.getUserRepository().save(user);
    return newUser;
  }

  public updatePassword(user: User): Promise<User> {
    return this.getUserRepository().save(user);
  }

  public generatePassword(password: string): Promise<string> {
    return this.hashPassword(password);
  }

  public getByUsername(username: string): Promise<User> {
    return this.getUserRepository().findOne({
      where: {
        username: username
      }
    })
  }

  private getUserRepository() {
    return getConnection().getRepository(UserDao);
  }

  private async hashPassword(password: string) {
    console.log("entra al metodo para hacer hash", password);
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

}

@Entity("User")
export class UserDao implements User {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  createdDate?: Date;
  @Column()
  reset?: boolean;
}