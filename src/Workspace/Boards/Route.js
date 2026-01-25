const express = require("express");
const router = express.Router();

const { createBoard } = require("./Controller");
const { getAllMyBoards } = require("./Controller");
const { getAllTeamBoards } = require("./Controller");
const { updateBoard } = require("./Controller");
const { deleteBoard } = require("./Controller");
const { searchUsersByEmail } = require("./Controller");
const auth = require("../../Middleware/Auth");


router.post("/create-board",auth, createBoard);
router.get("/get-allmyboards", auth, getAllMyBoards);
router.get("/get-allteamboards", auth, getAllTeamBoards);
router.put("/update-board/:id", auth, updateBoard);
router.delete("/delete-board/:id", auth, deleteBoard);
router.get("/users-search", auth, searchUsersByEmail);


module.exports = router;