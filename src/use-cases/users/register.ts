import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  // Criptografa a senha do usuario utilizando o metodo hash do bcrypt.
  const password_hash = await hash(password, 6);

  // Ferifica se ja esxiste um usuario com o mesmo email.
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("Email already Exists");
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  prismaUsersRepository.create({
    name,
    email,
    password_hash,
  });
}
