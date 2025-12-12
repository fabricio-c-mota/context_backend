import { FastifyInstance } from 'fastify';
import { attemptController } from '../controllers/attempt.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export default async function attemptRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/attempt',
    { preHandler: [authMiddleware] },
    (req, reply) => attemptController.makeAttempt(req, reply)
  );

  fastify.get(
    '/me/attempts',
    { preHandler: [authMiddleware] },
    (req, reply) => attemptController.myAttempts(req, reply)
  );
}
