import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "../../errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "@/use-cases/errors/late-check-in-validation-error";

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

    // Verifica quanto tempo se passou após a validação do check-in
    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes",
    );

    // Se o tempo de validação do check-in for maior que 20 minutos
    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  };
}
