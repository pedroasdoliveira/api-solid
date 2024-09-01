import { FastifyInstance } from "fastify";
import { register } from "../controllers/user/register";
import { autenticate } from "../controllers/auth/authenticate";
import { profile } from "../controllers/user/profile";
import { verifyJwt } from "../middlewares/verify-jwt";

export const userRoutes = async (app: FastifyInstance) => {
  // auth user routes
  app.post("/sessions", autenticate);

  // user routes
  app.post("/users", register);

  app.get("/me", { onRequest: [verifyJwt] }, profile);
};
