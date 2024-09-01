import { FastifyInstance } from "fastify";

import { verifyJwt } from "../middlewares/verify-jwt";
import { create } from "../controllers/gym/create";
import { search } from "../controllers/gym/search";
import { nearby } from "../controllers/gym/nearby";

export const gymRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.post("/gym", create);

  app.get("/gyms/search", search);

  app.get("/gyms/nearby", nearby);
};
