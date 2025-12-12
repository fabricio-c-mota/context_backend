import Fastify from 'fastify';
import * as dotenv from 'dotenv';
import jwtPlugin from './plugings/jwt';
import registerRoutes from './routes';

async function start() {
  dotenv.config();
  console.log('JWT_SECRET set:', !!process.env.JWT_SECRET);
  const fastify = Fastify({ logger: true });

  await fastify.register(jwtPlugin);
  await fastify.register(registerRoutes);

  const PORT = 3000;
  await fastify.listen({ port: PORT });
  console.log(`🚀 Server rodando em http://localhost:${PORT}`);
}

start();
