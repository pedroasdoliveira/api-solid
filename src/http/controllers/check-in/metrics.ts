import { FastifyRequest, FastifyReply } from "fastify";

import { makeGetUserMetricsUseCase } from "@/use-cases/factories/user/make-get-user-metrics-use-case";

export const metrics = async (request: FastifyRequest, reply: FastifyReply) => {
  const metricsCheckInsUseCase = makeGetUserMetricsUseCase();

  const { checkInsCount } = await metricsCheckInsUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    checkInsCount,
  });
};
