import { FastifyInstance } from "fastify";
import { register } from "./controllers/user/register";
import { autenticate } from "./controllers/auth/authenticate";
import { profile } from "./controllers/user/profile";
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
