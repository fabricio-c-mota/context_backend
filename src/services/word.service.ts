import prisma from '../prisma';

export class WordService {
  
  async createWordOfTheDay(word: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    
    const existing = await prisma.wordOfTheDay.findUnique({
      where: { date: today }
    });

    if (existing) {
      throw new Error("Já existe uma palavra cadastrada para hoje.");
    }

    
    return prisma.wordOfTheDay.create({
      data: {
        word,
        date: today
      }
    });
  }

 
  async getTodayWord() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const word = await prisma.wordOfTheDay.findUnique({
      where: { date: today }
    });

    if (!word) return null;

    return {
      length: word.word.length,
      date: word.date
    };
  }

  
  async getSecretWord() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return prisma.wordOfTheDay.findUnique({
      where: { date: today }
    });
  }
}

export const wordService = new WordService();
