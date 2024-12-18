const express = require("express");
const prisma = require("../prisma/index.cjs"); 
const { authenticate } = require("./auth.cjs"); 

const router = express.Router();

router.use(authenticate); 

router.get("/", async (req, res, next) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: {
        gameMaster: true,
        players: true,
        interactiveMaps: true, 
      }
    });
    res.json(campaigns);
  } catch (error) {
    console.error("Failed to find any campaigns:", error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: +req.params.id },
      include: { gameMaster: true, players: true, interactiveMaps: true },
    });

    if(!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    res.json(campaign)
  } catch (error) {
    console.error("Failed to find any campaigns:", error)
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { title, description, playerIds = [] } = req.body;
  const userId = req.user.id; 

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  if (playerIds.includes(userId)) {
    return res.status(400).json({ error: "You cannot be both a player and the gameMaster in the same campaign" });
  }

  try {
    const newCampaign = await prisma.campaign.create({
      data: {
        title,
        description,
        gameMasterId: userId, 
        players: {
          connect: playerIds.map((id) => ({ id })), 
        },
      },
    });

    res.status(201).json(newCampaign);
  } catch (error) {
    console.error("Error creating campaign:", error);
    next(error); 
  }
});

router.delete("/:id/players/:playerId", async (req, res, next) => {
  const { id: campaignId, playerId } = req.params;
  const userId = req.user.id; 

  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: +campaignId },
      include: { gameMaster: true, players: true },
    });

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    if (campaign.gameMasterId !== userId) {
      return res.status(403).json({ error: "You must be the gameMaster to remove players" });
    }

    const playerExists = campaign.players.some((player) => player.id === +playerId);
    if (!playerExists) {
      return res.status(404).json({ error: "Player not found in the campaign" });
    }

    const updatedCampaign = await prisma.campaign.update({
      where: { id: +campaignId },
      data: {
        players: {
          disconnect: { id: +playerId },
        },
      },
    });

    res.json(updatedCampaign);
  } catch (error) {
    console.error("Error removing player from campaign:", error);
    next(error);
  }
});


module.exports = router;