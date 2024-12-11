const express = require("express");
const prisma = require("../prisma/index.cjs"); 
const { authenticate } = require("./auth.cjs"); 

const router = express.Router();

router.use(authenticate); 

router.post("/", async (req, res) => {
  const { content, campaignId } = req.body;
  const userId = req.user.id; 

  try {
    const newNote = await prisma.note.create({
      data: {
        content,
        userId, 
        campaignId, 
      },
    });

    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create note" });
  }
});

