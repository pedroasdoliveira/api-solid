import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "@/use-cases/modules/gym/create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    // Executa antes de cada um dos testes
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("Should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "Dev Gym",
      description: "",
      phone: "",
      latitude: -23.6870365,
      longitude: -46.7167728,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
