const express = require("express");
const router = express.Router();

const { createBoard } = require("./Controller");
const { getAllBoard } = require("./Controller");
const { updateBoard } = require("./Controller");
const { deleteBoard } = require("./Controller");
const auth = require("../../Middleware/Auth");


//createBoard
router.post("/create-board",auth, createBoard);
router.get("/get-allboard", auth, getAllBoard);
router.put("/update-board/:id", auth, updateBoard);
router.delete("/delete-board/:id", auth, deleteBoard);

module.exports = router;