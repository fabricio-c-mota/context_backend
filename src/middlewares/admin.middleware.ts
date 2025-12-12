import { FastifyRequest, FastifyReply } from 'fastify';

export const adminMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
  const user = req.user;
  if (!user) {
    console.log('adminMiddleware - usuário não encontrado; token não verificado');
    return reply.code(401).send({ error: 'Unauthorized' });
  }
  console.log('adminMiddleware - user role:', user.role);
  if (user.role !== 'admin') {
    return reply.code(403).send({ error: 'Apenas administradores podem acessar esta rota' });
  }
};
