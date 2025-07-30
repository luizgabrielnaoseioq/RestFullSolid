import { prisma } from "@/lib/prisma";
import z from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcryptjs";
import { PrismaClientValidationError } from "generated/prisma/runtime/library";

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

  // Criptografa a senha do usuario utilizando o metodo hash do bcrypt.
  const password_hash = await hash(password, 6);

  // Ferifica se ja esxiste um usuario com o mesmo email.
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    }
  })

  if(userWithSameEmail) {
    reply.status(409).send()
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });

  return reply.status(201).send();
}
