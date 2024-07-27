import { Gym } from "@prisma/client";
import { GymsRepository } from "../../../repositories/gyms-repository";

interface ISearchGymUseCase {
  query: string;
  page: number;
}

interface ISearchGymUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  execute = async ({
    query,
    page,
  }: ISearchGymUseCase): Promise<ISearchGymUseCaseResponse> => {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return {
      gyms,
    };
  };
}
