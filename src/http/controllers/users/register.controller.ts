import { prisma } from "@/lib/prisma";
import z from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcryptjs";
import { PrismaClientValidationError } from "generated/prisma/runtime/library";
import { registerUseCase } from "@/use-cases/users/register";

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });

  const { name, email, password } = createUserBodySchema.parse(request.body);

  try {
    await registerUseCase ({
      name,
      email,
      password,
    })
  } catch (error) {
    reply.code(409).send()
  }

  return reply.status(201).send();
}
