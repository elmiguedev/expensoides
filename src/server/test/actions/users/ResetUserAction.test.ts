import bcrypt from "bcrypt";
import { ResetUserAction } from "../../../main/actions/users/ResetUserAction";
import { User } from "../../../main/domain/users/User";
import { InMemoryDb } from "../../../main/infrastructure/db/InMemoryDb";
import { InMemoryUserRepository } from "../../../main/infrastructure/services/users/InMemoryUserRepository";

describe('reset user action', () => {

  test("should set a new password to user", async () => {
    const userRepository = await getUserRepository();
    const action = new ResetUserAction(userRepository);

    const userInput = {
      id: 1,
      username: "pepe",
      password: "argento",
      passwordRepeat: "argento"
    }

    const user: User = await action.execute(userInput);

    expect(bcrypt.compareSync(userInput.password, user.password)).toEqual(true);
  })


  test("should fail if passwords are distinct", async () => {
    const userRepository = await getUserRepository();
    const action = new ResetUserAction(userRepository);

    const userInput = {
      id: 1,
      username: "pepe",
      password: "argento",
      passwordRepeat: "argentodistinta"
    }

    expect(async () => {
      await action.execute(userInput);
    }).rejects.toThrowError();
  })

  test("should set reset status to false", async () => {
    const userRepository = await getUserRepository();
    const action = new ResetUserAction(userRepository);

    const userInput = {
      id: 1,
      username: "pepe",
      password: "argento",
      passwordRepeat: "argento"
    }

    const user = await action.execute(userInput);

    expect(user.reset).toEqual(false);
  })
})

const getUserRepository = async () => {
  InMemoryDb.getInstance().users = [];
  const repository = new InMemoryUserRepository();
  await repository.add({
    username: "pepe",
    password: "",
    reset: true
  });
  return repository;
}


