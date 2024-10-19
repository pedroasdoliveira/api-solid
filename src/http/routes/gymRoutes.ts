import { FastifyInstance } from "fastify";

import { verifyJwt } from "../middlewares/verify-jwt";
import { create } from "../controllers/gym/create";
import { search } from "../controllers/gym/search";
import { nearby } from "../controllers/gym/nearby";
import { verifyUserRole } from "../middlewares/verify-user-role";

export const gymRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create);

  app.get("/gyms/search", search);

  app.get("/gyms/nearby", nearby);
};
