// src/routes/user.routes.ts
import { FastifyInstance } from 'fastify';
import { userService } from '../services/user.service';

export default async function userRoutes(app: FastifyInstance) {
  app.post('/', async (req, reply) => {
    const { name, email, password } = req.body as { name?: string; email?: string; password?: string };

    if (!name || !email || !password) {
      return reply.code(400).send({ error: 'name, email and password are required' });
    }

    try {
      const user = await userService.createUser(name, email, password);
      
      return reply.code(201).send({ id: user.id, name: user.name, email: user.email, role: user.role });
    } catch (err: any) {
     
      if (err?.code === 'P2002' || err?.meta?.target?.includes?.('email')) {
        return reply.code(409).send({ error: 'Email already in use' });
      }
      console.error(err);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}
