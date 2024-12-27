import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.transcription.create({
    data: {
      sentencelocal: "Test local",
      sentenceapi: "Test API",
      audioUrl: "https://example.com/audio.mp3"
    }
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()); 