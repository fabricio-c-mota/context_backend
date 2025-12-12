import { FastifyInstance } from 'fastify';
import { wordController } from '../controllers/word.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';

export default async function adminRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/word',
    {
      preHandler: [authMiddleware, adminMiddleware]
    },
    (req, reply) => wordController.create(req, reply)
  );
}
