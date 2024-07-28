import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "@/use-cases/modules/gym/fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    // Executa antes de cada um dos testes
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  // Se a academia for proxima o resultado será 0, caso ao contrario maior que 0

  it("Should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: "",
      phone: "",
      latitude: -23.6870365,
      longitude: -46.7167728,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: "",
      phone: "",
      latitude: -27.0610365,
      longitude: -49.5229528,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.6870365,
      userLongitude: -46.7167728,
    });

    // Significa que existe academias próximas a 10km
    expect(gyms).toHaveLength(1); // Retorna apenas a primeira academia
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });

  it("Should be able to fetch far gyms", async () => {
    await gymsRepository.create({
      title: "Far Gym",
      description: "",
      phone: "",
      latitude: -27.0610365,
      longitude: -49.5229528,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.6870365,
      userLongitude: -46.7167728,
    });

    // Não há academias a 10km
    expect(gyms).toHaveLength(0); // Não deve retornar academias distantes
    expect(gyms).toEqual([]);
  });

  it("Should fetch multiple gyms within 10 km radius", async () => {
    await gymsRepository.create({
      title: "Near Gym 1",
      description: "",
      phone: "",
      latitude: -23.6870365,
      longitude: -46.7167728,
    });

    await gymsRepository.create({
      title: "Near Gym 2",
      description: "",
      phone: "",
      latitude: -23.6820365,
      longitude: -46.7127728,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.6870365,
      userLongitude: -46.7167728,
    });

    // Caso tenha mais de 1 academia num raio de 10km
    expect(gyms).toHaveLength(2); // Deve retornar as duas academias
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Near Gym 1" }),
      expect.objectContaining({ title: "Near Gym 2" }),
    ]);
  });
});
