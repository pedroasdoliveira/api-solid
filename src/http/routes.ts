import { FastifyInstance } from "fastify";

import { userRoutes } from "./routes/userRoutes";
import { gymRoutes } from "./routes/gymRoutes";

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

  //
};
