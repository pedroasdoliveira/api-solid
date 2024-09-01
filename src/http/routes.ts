import { FastifyInstance } from "fastify";

import { userRoutes } from "./routes/userRoutes";
import { gymRoutes } from "./routes/gymRoutes";
import { checkInRoutes } from "./routes/checkInRoutes";

/*
  Tipos de autentificação:

  - Basic Auth (Base64)
  - JWT
  - API Token
  - OAuth
*/

export const appRoutes = async (app: FastifyInstance) => {
  // users routes
  await app.register(userRoutes);

  // gyms routes
  await app.register(gymRoutes);

  // check-in routes
  await app.register(checkInRoutes);
};
