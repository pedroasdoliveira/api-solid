import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "@/use-cases/modules/user/get-user-metrics";

export const makeGetUserMetricsUseCase = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(prismaCheckInsRepository);

  return useCase;
};
