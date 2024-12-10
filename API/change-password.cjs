const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../prisma/index.cjs')
const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.slice(7);

  if (!token){
    return next();
  }

  try {
    
  } catch (error) {
    
  }
}