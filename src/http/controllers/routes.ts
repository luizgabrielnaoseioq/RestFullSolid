import { FastifyInstance } from "fastify";
import { registerUser } from "./users/register.controller";
import { getAllUsers } from "./users/get.controller";

export async function appRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    console.log(`[${request.method} ${request.url}]`);
  });

  app.post("/users", registerUser);

  app.get("/users", getAllUsers);
}
