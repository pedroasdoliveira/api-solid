import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { User } from "@prisma/client";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  execute = async ({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> => {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  };
}
