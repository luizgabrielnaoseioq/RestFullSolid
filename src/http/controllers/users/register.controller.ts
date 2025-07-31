<<<<<<< HEAD
import { z } from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "@/use-cases/users/register";
import { userAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof userAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err
=======
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
>>>>>>> 6b5df5e410c6a3cba9f89cc8d99dd790503a7d5a
  }

  return reply.status(201).send();
}
