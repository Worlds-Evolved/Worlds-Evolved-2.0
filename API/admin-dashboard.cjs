const express = require("express");
const prisma = require("../prisma/index.cjs"); 
const { authenticate } = require("./auth.cjs"); 

const router = express.Router();

function isAdmin(req, res, next) {
  if (req.user && req.user.role === "ADMIN") {
    return next();
  }
  return next({ status: 403, message: "Forbidden: Admin access required" });
}

router.use(authenticate); 

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        campaigns: true, 
        campaignsAsGM: true, 
      },
    });

    res.json({ users });
  } catch (error) {
    next(error); 
  }
});

module.exports = router;