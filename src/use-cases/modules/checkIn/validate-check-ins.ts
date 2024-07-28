import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "../../errors/resource-not-found-error";

interface ValidateCheckInsUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInsUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  execute = async ({
    checkInId,
  }: ValidateCheckInsUseCaseRequest): Promise<ValidateCheckInsUseCaseResponse> => {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  };
}
