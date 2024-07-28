import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../auth/authenticate-use-case";

export const makeAuthenticateUseCase = () => {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

  return authenticateUseCase;
};
