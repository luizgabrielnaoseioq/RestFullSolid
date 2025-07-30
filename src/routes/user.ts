import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function userRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request, reply) => {
    console.log(`[${request.method} ${request.url}]`);
  });

  app.post("/", async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUserBodySchema.parse(request.body);

    await prisma.user.create({
      data: {
        name,
        email,
        password_hash: password,
      },
    });

    return reply.status(201).send();
  });
}
