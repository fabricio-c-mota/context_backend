import { FastifyRequest, FastifyReply } from 'fastify';
import { wordService } from '../services/word.service';
import { attemptService } from '../services/attempt.service';
import { SimilarityCalculator } from '../utils/similarity';

const similarityCalc = new SimilarityCalculator();

export class AttemptController {
  async makeAttempt(req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as { word?: string };
    const user = req.user;
    if (!user) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    if (!body || !body.word) {
      return reply.code(400).send({ error: 'word is required' });
    }

    const todaySecret = await wordService.getSecretWord();
    if (!todaySecret) {
      return reply.code(404).send({ error: 'Word for today not set' });
    }

    
    const { similarity, rank } = similarityCalc.calculate(
      body.word,
      todaySecret.word
    );

    
    const attempt = await attemptService.createAttempt(
      user.id,
      body.word,
      similarity,
      rank
    );

    return reply.send({
      word: attempt.word,
      similarity: attempt.similarity,
      rank: attempt.rank
    });
  }

  async myAttempts(req: FastifyRequest, reply: FastifyReply) {
    const user = req.user;
    if (!user) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }
    const attempts = await attemptService.getAttemptsByUser(user.id);
    return reply.send(attempts);
  }
}

export const attemptController = new AttemptController();
