import { Gym } from "@prisma/client";
import { GymsRepository } from "../../../repositories/gyms-repository";

interface IFetchNearbyGymUseCase {
  userLatitude: number;
  userLongitude: number;
}

interface IFetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  execute = async ({
    userLatitude,
    userLongitude,
  }: IFetchNearbyGymUseCase): Promise<IFetchNearbyGymsUseCaseResponse> => {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  };
}
