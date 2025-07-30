import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { error } from "console";

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
    throw new Error('Email already Exists')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}
