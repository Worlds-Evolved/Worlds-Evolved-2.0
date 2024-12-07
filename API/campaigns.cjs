const express = require("express");
const prisma = require("../prisma/index.cjs"); 
const { authenticate } = require("./auth.cjs"); 

const router = express.Router();

router.use(authenticate); 

router.get("/campaigns", async (req, res, next) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: { gameMaster: true, players: true, interativeMaps: true },
    })
    res.json(campaigns)
  } catch (error) {
    console.error("Failed to find any campaigns:", error)
    next(error);
  }
});

