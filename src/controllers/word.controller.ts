import { FastifyRequest, FastifyReply } from 'fastify';
import { wordService } from '../services/word.service';

export class WordController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { word } = req.body as { word: string };

      if (!word || word.length < 1) {
        return reply.code(400).send({ error: "Palavra inválida." });
      }

      const data = await wordService.createWordOfTheDay(word);

      return reply.code(201).send({
        message: "Palavra criada com sucesso.",
        date: data.date,
        length: data.word.length
      });
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  }
}

export const wordController = new WordController();
