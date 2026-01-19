const User = require("../../Models/User");
const jwt = require ("jsonwebtoken");

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const errors = {};

        const emailClean = email.trim().toLowerCase();

        if (!email || email.trim() === "") {
            errors.email = "Email wajib diisi";
        }

        const user = await User.findOne({ email: emailClean });
        if (!user) {
            return res.status(400).json({
                errors: { email: "Email tidak terdaftar" },
            });
        }

        if (!password || password.trim() === "") {
            errors.password = "Password wajib diisi";
        }

        if (user.password !== password) {
            return res.status(400).json({
                errors: { password: "Password salah" },
            });
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }
        
        const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
          process.env.JWT_SECRET,
        { expiresIn: "1h" }
        );


        res.status(200).json({
        message: "Login berhasil",
        token : token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
        errors: { general: "Terjadi kesalahan server" },
        });
    }
}

module.exports = { login };
