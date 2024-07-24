import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../../errors/user-already-exists-error";
import { Gym } from "@prisma/client";
import { GymsRepository } from "../../../repositories/gyms-repository";

interface ICreateGymUseCase {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface ICreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  execute = async ({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: ICreateGymUseCase): Promise<ICreateGymUseCaseResponse> => {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym,
    };
  };
}
