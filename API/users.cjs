const express = require("express");
const prisma = require("../prisma/index.cjs");
const { authenticate } = require("./auth.cjs");

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { campaigns: true, campaignsAsGM: true },
    });

    const campaigns = user.campaigns.length > 0 ? user.campaigns : false;
    const campaignsAsGM = user.campaignsAsGM.length > 0 ? user.campaignsAsGM : false;

    res.json({
      ...user,
      campaigns, 
      campaignsAsGM,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/", authenticate, async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { username, email, password },
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;