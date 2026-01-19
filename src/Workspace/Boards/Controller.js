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

module.exports = { createBoard };
