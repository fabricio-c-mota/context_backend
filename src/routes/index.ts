import { FastifyInstance } from 'fastify';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import workRoutes from './work.routes';
import adminRoutes from './admin.routes';
import attemptRoutes from './attempt.routes';

export default async function registerRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes, { prefix: '/auth' });
  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(workRoutes);
  fastify.register(attemptRoutes);
  fastify.register(adminRoutes, { prefix: '/admin' });
}
