import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth.controller";

const controller = new AuthController();

export default async function authRoutes(app: FastifyInstance) {
  app.post("/register", (req, reply) => controller.register(req, reply));
  app.post("/login", (req, reply) => controller.login(req, reply));
}
