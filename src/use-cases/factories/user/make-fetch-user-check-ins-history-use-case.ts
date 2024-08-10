import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchUsersCheckInsHistoryUseCase } from "@/use-cases/modules/checkIn/fetch-users-check-ins-history";

export const makeFetchUserCheckInsHistoryUseCase = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUsersCheckInsHistoryUseCase(
    prismaCheckInsRepository,
  );

  return useCase;
};
