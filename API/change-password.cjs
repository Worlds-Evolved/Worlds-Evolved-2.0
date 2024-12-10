const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../prisma/index.cjs')
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.slice(7);

  if (!token){
    return next();
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET)
    const user = await prisma.user.findUniqueOrThrow({ where: { id } })
    req.user = user;
    next();
  } catch (error) {
    next({ status: 401, message: "You're not logged in" });
  }
}