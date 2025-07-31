import { PrismaClient } from "generated/prisma";
import { env } from "process";

export const prisma = new PrismaClient({
  // Se ambiente for de desenvolviemnto ele log as querys feitas se nao ele manda nulo
  log: env.NODE_ENV === 'dev' ? ['query'] : []
});
