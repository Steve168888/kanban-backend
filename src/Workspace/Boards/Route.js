const express = require("express");
const router = express.Router();

const { createBoard } = require("./Controller");
const { getAllBoard } = require("./Controller");
const auth = require("../../Middleware/Auth");


//createBoard
router.post("/create-board",auth, createBoard);
router.get("/get-allboard", auth, getAllBoard);

module.exports = router;