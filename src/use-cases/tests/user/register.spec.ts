import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "../../modules/user/register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "../../errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    // Executa antes de cada um dos testes
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("Should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "123456",
    });

    const isPasswordHashedValid = await compare("123456", user.password_hash);

    expect(isPasswordHashedValid).toBe(true);
  });

  it("Should not be able to register with same email twice", async () => {
    const email = "john.doe@gmail.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
