import prisma from '../prisma';
import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export class UserService {
  async createUser(name: string, email: string, password: string, role = 'user') {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    return prisma.user.create({
      data: { name, email, password: hashed, role }
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async verifyPassword(plain: string, hashed: string) {
    return bcrypt.compare(plain, hashed);
  }
}

export const userService = new UserService();
