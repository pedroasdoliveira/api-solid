import { FastifyInstance } from "fastify";
import { register } from "./modules/user/controllers/register";
import { autenticate } from "./modules/auth/controllers/authenticate";

export const appRoutes = async (app: FastifyInstance) => {
  // auth routes
  app.post("/sessions", autenticate);

  // users routes
  app.post("/users", register);
};
