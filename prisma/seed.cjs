const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const faker = require("faker");

async function main() {
  // Create 50 users
  const users = await Promise.all(
    Array.from({ length: 50 }).map(() =>
      prisma.user.create({
        data: {
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      })
    )
  );

  // Create 10 campaigns
  for (let i = 0; i < 10; i++) {
    // Select a random user as Game Master
    const gameMaster = users[Math.floor(Math.random() * users.length)];

    // Select random players (up to 5, excluding the Game Master)
    const shuffledUsers = users.filter((u) => u.id !== gameMaster.id).sort(() => 0.5 - Math.random());
    const players = shuffledUsers.slice(0, Math.min(5, shuffledUsers.length));

    // Create the campaign
    const campaign = await prisma.campaign.create({
      data: {
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(),
        gameMasterId: gameMaster.id,
        players: {
          connect: players.map((player) => ({ id: player.id })),
        },
      },
    });

    // Add interactive maps to the campaign
    for (let j = 0; j < 3; j++) { // Each campaign has 3 maps
      await prisma.interactiveMap.create({
        data: {
          title: faker.lorem.words(3),
          imageUrl: faker.image.imageUrl(),
          campaignId: campaign.id,
        },
      });
    }
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
