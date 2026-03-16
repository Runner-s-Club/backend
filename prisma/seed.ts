import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Example: create a default admin user
  const user = await prisma.user.upsert({
    where: { email: 'admin@runnerclub.com' },
    update: {},
    create: {
      email: 'admin@runnerclub.com',
      name: 'Admin',
    },
  });

  console.log('Created user:', user);
  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
