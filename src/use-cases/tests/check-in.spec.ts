import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "../check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    // Executa antes de cada um dos testes
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it("Should be able to check in", async () => {
    const { checkIn } = await sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
