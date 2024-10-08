import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/user/make-fetch-user-check-ins-history-use-case";

export const history = async (request: FastifyRequest, reply: FastifyReply) => {
  const historyCheckInsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = historyCheckInsQuerySchema.parse(request.query);

  const historyCheckInsUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await historyCheckInsUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
};
