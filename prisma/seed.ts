import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: hashedPassword
    }
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()); 