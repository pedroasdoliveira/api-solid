import { expect, describe, it, beforeEach } from "vitest";
import { compare, hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "../auth/authenticate";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    // Executa antes de cada um dos testes
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("Should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "john.doe@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not be able to authenticate with wrong email", async () => {
    expect(() =>
      sut.execute({
        email: "john.doe@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password_hash: await hash("123456", 6),
    });

    expect(() =>
      sut.execute({
        email: "john.doe@gmail.com",
        password: "1231233",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
