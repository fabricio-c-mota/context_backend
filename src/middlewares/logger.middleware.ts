import { FastifyRequest, FastifyReply } from 'fastify';
import { FastifyInstance } from 'fastify';

export async function loggerMiddleware(app: FastifyInstance) {
  app.addHook("onRequest", async (req) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  });
}

