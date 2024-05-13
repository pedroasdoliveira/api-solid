import { FastifyInstance } from "fastify";
import { register } from "./modules/user/controllers/register";

export const appRoutes = async (app: FastifyInstance) => {
    app.post('/users', register)
}