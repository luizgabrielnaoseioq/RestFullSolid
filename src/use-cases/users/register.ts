<<<<<<< HEAD
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { userAlreadyExistsError } from '../errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new userAlreadyExistsError
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
=======
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
>>>>>>> 6b5df5e410c6a3cba9f89cc8d99dd790503a7d5a
}
