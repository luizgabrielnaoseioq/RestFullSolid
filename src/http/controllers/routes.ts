import { FastifyInstance } from "fastify";
import { registerUser } from "./users/register.controller";
import { getAllUsers } from "./users/get.controller";

export async function appRoutes(app: FastifyInstance) {
<<<<<<< HEAD
  app.addHook("preHandler", async (request, reply) => {
=======
  app.addHook("preHandler", async (request) => {
>>>>>>> 6b5df5e410c6a3cba9f89cc8d99dd790503a7d5a
    console.log(`[${request.method} ${request.url}]`);
  });

  app.post("/users", registerUser);

  app.get("/users", getAllUsers);
}
