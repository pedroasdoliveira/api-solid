import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "../../modules/checkIn/check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "@/use-cases/errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "@/use-cases/errors/max-distance-error";
import { ValidateCheckInsUseCase } from "@/use-cases/modules/checkIn/validate-check-ins";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

// let gymsRepository: InMemoryGymsRepository;
let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInsUseCase;

describe("Validate Check-ins Use Case", () => {
  beforeEach(async () => {
    // Executa antes de cada um dos testes
    // gymsRepository = new InMemoryGymsRepository();
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInsUseCase(checkInsRepository);

    // await gymsRepository.create({
    //   id: "gym-01",
    //   title: "Blue Academia",
    //   description: "",
    //   phone: "",
    //   latitude: -23.6870365,
    //   longitude: -46.7167728,
    // });

    // vi.useFakeTimers();
  });

  afterEach(() => {
    // vi.useRealTimers();
  });

  it("Should be able to validate check ins", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    // Espero que tenha validado a data de check in

    expect(checkIn.validated_at).toEqual(expect.any(Date)); // Que a data do check tenha alguma data diferente de null
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date)); // Que exista uma data de check ins no banco
  });

  it("Should not be able to validate an inexistent check-in", async () => {
    // Espero que check in inexistente não seja validado

    await expect(() =>
      sut.execute({
        checkInId: "inexistent-check-in-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
