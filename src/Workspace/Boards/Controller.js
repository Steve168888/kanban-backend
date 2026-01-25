const Board = require("../../Models/Board");
const User = require("../../Models/User");

async function createBoard(req, res) {
    try { 
        const userId = req.user.id;
        const { name, type = "my", members = [] } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                errors: {
                    name: "Board name wajib diisi",
                },
            });
        }

        const board = await Board.create({
            name: name.trim(),
            userId,
            type,
            members: type === "team" ? members : [],
        });

        res.status(201).json({
            message: "Board berhasil dibuat",
            data: board,
        });

    } catch (error) {
        console.error("CREATE BOARD ERROR:", error);
        res.status(500).json({
        errors: {
            general: "Terjadi kesalahan server",
        },
        });
    }
}


async function getAllMyBoards(req, res) {
    try {
        const userId = req.user.id;

        const boards = await Board.find({
            userId,
            type: "my",
            isDeleted: false,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Berhasil mengambil board",
            data: boards,
        });

    } catch (error) {
        console.error("GET ALL BOARD ERROR:", error);
        res.status(500).json({
            errors: {
                general: "Terjadi kesalahan server",
            },
        });
    }
}

async function getAllTeamBoards(req, res) {
    try {
        const userId = req.user.id;

        const boards = await Board.find({
        type: "team",
        isDeleted: false,
        $or: [
            { userId },          
            { members: userId } 
        ],
        }).sort({ createdAt: -1 });

        res.status(200).json({
        message: "Berhasil mengambil team board",
        data: boards,
        });

    } catch (error) {
        console.error("GET TEAM BOARD ERROR:", error);
        res.status(500).json({
        errors: {
            general: "Terjadi kesalahan server",
        },
        });
    }
}

async function updateBoard(req, res){
    try{
        const userId = req.user.id;
        const { id } = req.params;
        const { name } = req.body;

        if(!name || name.trim() === ""){
            return res.status(400).json({
                errors: {
                    name: "Nama board wajib diisi",
                },
            });
        }

        const board = await Board.findOneAndUpdate(
            { _id: id, userId, isDeleted: false},
        );

        if(!board){
            return res.status(404).json({
                errors: {
                    board: "Board tidak ditemukan",
                },
            });
        }

        const trimedName = name.trim();

        if(board.name === trimedName){
            return res.status(400).json({
                errors: {
                    name: "Nama board tidak berubah"
                },
            });
        }

        board.name = trimedName;
        await board.save();

        res.status(200).json({
            message: "Board berhasil diupdate",
            data: board,
        });

    }catch(err){
        res.status(500).json({
            errors: {
                general: "Terjadi kesalahan server",
            },
        });
    }
}

async function deleteBoard(req, res){
    try{
        const userId = req.user.id;
        const { id } = req.params;

        const board = await Board.findOneAndUpdate(
            { _id: id, userId, isDeleted: false},
            { isDeleted: true },
            { new: true }
        );

        if(!board){
            return res.status(404).json({
                errors: {
                    board: "Board tidak ditemukan",
                },
            });
        }

        res.status(200).json({
            message: "Board berhasil dihapus",
        });

    }catch(err){
        res.status(500).json({
            errors: {
                general: "Terjadi kesalahan server",
            },
        });
    }
}

async function searchUsersByEmail(req, res){
    try {
        const userId = req.user.id;
        const { q } = req.query;

        if (!q || q.trim() === "") {
            return res.status(200).json({
                data: [],
            });
        }

        const users = await User.find({
            _id: { $ne: userId },
            $or: [
                    { email: { $regex: q, $options: "i" } },
                    { name: { $regex: q, $options: "i" } },
                ],
        })
        .select("_id name email")
        .limit(10);

        res.status(200).json({
            message: "Berhasil mencari user",
            data: users,
        });

    } catch (error) {
        console.error("SEARCH USER ERROR:", error);
        res.status(500).json({
            errors: {
                general: "Terjadi kesalahan server",
            },
        });
    }
}

module.exports = { 
    createBoard,
    getAllMyBoards,
    getAllTeamBoards,
    updateBoard,
    deleteBoard,
    searchUsersByEmail,
};
