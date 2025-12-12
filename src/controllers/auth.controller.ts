import { FastifyReply, FastifyRequest } from "fastify";
import { userService } from "../services/user.service";

export class AuthController {
  async register(req: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = req.body as any;

    const user = await userService.createUser(name, email, password);

    return reply.send({
      id: user.id,
      email: user.email,
      role: user.role
    });
  }

  async login(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as any;
    const user = await userService.findByEmail(email);

    if (!user) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const match = await userService.verifyPassword(password, user.password);

    if (!match) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const token = await reply.jwtSign({
      id: user.id,
      role: user.role
    });
    console.log('Generated JWT token length', typeof token === 'string' ? token.length : 'non-string', token);
    return reply.send({ token });
  }
}
