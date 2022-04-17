import { LoginUserAction } from "../../../main/actions/users/LoginUserAction"
import { ResetUserAction } from "../../../main/actions/users/ResetUserAction"
import { InMemoryDb } from "../../../main/infrastructure/db/InMemoryDb"
import { InMemoryUserRepository } from "../../../main/infrastructure/services/users/InMemoryUserRepository"

describe("LoginUserAction should", () => {

  test("return user data if password is valid", async () => {
    const userRepository = await getUserRepository();
    const action = new LoginUserAction(userRepository);

    const username = "pepe";
    const password = "argento";

    const user = await action.execute({ username, password });

    expect(user).not.toBeUndefined();
  })

  test("throw an error if password is invalid", async () => {
    const userRepository = await getUserRepository();
    const action = new LoginUserAction(userRepository);

    const username = "pepe";
    const password = "wrongpassword";

    expect(async () => {
      await action.execute({ username, password });
    }).rejects.toThrowError();
  })

  test("throw an error if user does not exists", async () => {
    const userRepository = await getUserRepository();
    const action = new LoginUserAction(userRepository);

    const username = "pepa";
    const password = "argento";

    expect(async () => {
      await action.execute({ username, password });
    }).rejects.toThrowError();
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

  const resetAction = new ResetUserAction(repository);
  await resetAction.execute({
    id: 1,
    username: "pepe",
    password: "argento",
    passwordRepeat: "argento",
  });

  return repository;
}