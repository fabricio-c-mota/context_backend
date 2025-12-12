import { FastifyRequest, FastifyReply } from 'fastify';

export const authMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = await req.jwtVerify<{ id: number; role: string }>();
    req.user = user;
    console.log('authMiddleware - user verified:', user);
  } catch (err) {
    console.log('authMiddleware - invalid token or missing:', String(err));
    return reply.code(401).send({ error: 'Unauthorized' });
  }
};
