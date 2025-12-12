import '@fastify/jwt';
import 'fastify';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: number; role: string };
    user: { id: number; role: string };
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: { id: number; role: string };
  }
}
