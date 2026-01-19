const express = require("express");
const router = express.Router();

const { createBoard } = require("./Controller");
const auth = require("../../Middleware/Auth");


//createBoard
router.post("/create-board",auth, createBoard);

module.exports = router;