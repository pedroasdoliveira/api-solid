import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-auth-user";

describe("Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Nova Gym",
        description: "Nova gym description",
        phone: "1199484356",
        latitude: -23.6870365,
        longitude: -46.7167728,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Yory Gym",
        description: "York gym description",
        phone: "1199484378",
        latitude: -27.0610365,
        longitude: -49.5229528,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -23.6870365,
        longitude: -46.7167728,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Nova Gym",
      }),
    ]);
  });
});
