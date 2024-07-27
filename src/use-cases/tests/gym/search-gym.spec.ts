import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymUseCase } from "@/use-cases/modules/gym/search-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;

describe("Fetch check-ins history Use Case", () => {
  beforeEach(async () => {
    // Executa antes de cada um dos testes
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymsRepository);
  });

  it("Should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Dev Gym",
      description: "",
      phone: "",
      latitude: -23.6870365,
      longitude: -46.7167728,
    });

    await gymsRepository.create({
      title: "Phoenix Gym",
      description: "",
      phone: "",
      latitude: -23.6870365,
      longitude: -46.7167728,
    });

    const { gyms } = await sut.execute({
      query: "Dev",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Dev Gym" })]);
  });

  it("Should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Local gym-${i}`,
        description: "",
        phone: "",
        latitude: -23.6870365,
        longitude: -46.7167728,
      });
    }

    const { gyms } = await sut.execute({
      query: "Local gym",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Local gym-21" }),
      expect.objectContaining({ title: "Local gym-22" }),
    ]);
  });
});
