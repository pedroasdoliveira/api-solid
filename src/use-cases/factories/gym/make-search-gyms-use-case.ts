import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymUseCase } from "@/use-cases/modules/gym/search-gym";

export const makeSearchGymsUseCase = () => {
  const prismaGymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymUseCase(prismaGymsRepository);

  return useCase;
};
