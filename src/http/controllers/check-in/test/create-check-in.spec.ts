import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-auth-user";
import { prisma } from "@/lib/prisma";

describe("Create Check in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to create a check in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "Nova Gym",
        description: "Nova gym description",
        phone: "1199484356",
        latitude: -23.6870365,
        longitude: -46.7167728,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -23.6870365,
        longitude: -46.7167728,
      });

    expect(response.statusCode).toEqual(201);
  });
});
