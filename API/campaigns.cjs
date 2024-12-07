const express = require("express");
const prisma = require("../prisma/index.cjs"); 
const { authenticate } = require("./auth.cjs"); 

const router = express.Router();

router.use(authenticate); 

