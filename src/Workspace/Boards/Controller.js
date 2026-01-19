const Board = require("../../Models/Board");

async function createBoard(req, res) {
    try {
        // 🔐 userId dari JWT (di-set oleh auth middleware)
        const userId = req.user.id;
        const { name } = req.body;

        // VALIDASI
        if (!name || name.trim() === "") {
            return res.status(400).json({
                errors: {
                    name: "Board name wajib diisi",
                },
            });
        }

        // CREATE BOARD
        const board = await Board.create({
            name: name.trim(),
            userId,
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


async function getAllBoard(req, res) {
    try {
        // 🔐 userId dari JWT
        const userId = req.user.id;

        // Ambil semua board milik user
        const boards = await Board.find({
            userId,
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


async function updateBoard(req, res){
    try{
        // ambil userId dari JWT
        const userId = req.user.id;

        // ambil boardId dari URL
        const { id } = req.params;

         // ambil nama baru
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
            { name: name.trim() },
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

module.exports = { 
    createBoard,
    getAllBoard,
    updateBoard,
    deleteBoard
};
