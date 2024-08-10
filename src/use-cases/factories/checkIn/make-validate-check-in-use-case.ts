import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInsUseCase } from "@/use-cases/modules/checkIn/validate-check-ins";

export const makeValidateCheckInUseCase = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInsUseCase(prismaCheckInsRepository);

  return useCase;
};
