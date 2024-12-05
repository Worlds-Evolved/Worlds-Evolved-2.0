const prisma = require("./index.cjs");
const { faker } = require("@faker-js/faker");



  const seed = async (numUsers = 25, numCampaigns = 10) => {
    for (let i = 0; i < numUsers; i++) {
      const campaigns = Array.from({ length: numCampaigns }, () => ({
        title: faker.book.title(),
        description: faker.lorem.sentences(2),
      }));
      await prisma.user.create({
        data: {
          username: faker.internet.displayName(),
          email:  faker.internet.email(),
          password: faker.internet.password(),
          campaigns: { create: campaigns },
        },
      });
    }
  };




  seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });