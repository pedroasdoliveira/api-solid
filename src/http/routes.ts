import { FastifyInstance } from "fastify";
import { register } from "./modules/user/controllers/register";
import { autenticate } from "./modules/auth/controllers/authenticate";
import { profile } from "./modules/user/controllers/profile";
import { verifyJwt } from "./middlewares/verify-jwt";

/*
  Tipos de autentificação:

  - Basic Auth (Base64)
  - JWT
  - API Token
  - OAuth
*/

export const appRoutes = async (app: FastifyInstance) => {
  // auth routes
  app.post("/sessions", autenticate);

  // users routes
  app.post("/users", register);

  app.get("/me", { onRequest: [verifyJwt] }, profile);
};
