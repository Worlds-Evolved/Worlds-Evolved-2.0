const prisma = require("../prisma");

const seed = async () => {
  //TODO: seed dummy data
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });