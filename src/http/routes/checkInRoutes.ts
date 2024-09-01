import { FastifyInstance } from "fastify";

import { verifyJwt } from "../middlewares/verify-jwt";
import { createCheckIn } from "../controllers/check-in/create";
import { validate } from "../controllers/check-in/validate";
import { history } from "../controllers/check-in/history";
import { metrics } from "../controllers/check-in/metrics";

export const checkInRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.post("/gyms/:gymId/check-ins", createCheckIn);

  app.patch("/check-ins/:checkInId/validate", validate);

  app.get("/check-ins/history", history);

  app.get("/check-ins/metrics", metrics);
};
