import { FastifyInstance } from 'fastify';

export default async function workRoutes(fastify: FastifyInstance) {
  fastify.get('/work-today', async (req, reply) => {
    return { message: 'Funcionando!' };
  });
}
