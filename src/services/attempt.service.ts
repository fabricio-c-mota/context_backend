import prisma from '../prisma';

export class AttemptService {
  async createAttempt(userId: number, word: string, similarity: number, rank: number) {
    return prisma.attempt.create({
      data: { userId, word, similarity, rank }
    });
  }

  async getAttemptsByUser(userId: number) {
    return prisma.attempt.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
}

export const attemptService = new AttemptService();
