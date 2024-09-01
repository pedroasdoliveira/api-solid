import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeValidateCheckInUseCase } from "@/use-cases/factories/checkIn/make-validate-check-in-use-case";

export const validate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const validadeCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validadeCheckInParamsSchema.parse(request.params);

  const validateCheckInUseCase = makeValidateCheckInUseCase();

  await validateCheckInUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
};
