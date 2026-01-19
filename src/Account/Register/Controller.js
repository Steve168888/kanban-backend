const User = require("../../Models/User");

async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        const errors = {}; 

        if (!name || name.trim() === "") {
            errors.name = "Nama wajib diisi";
        }

        const emailClean = email.trim().toLowerCase();

        const existingUser = await User.findOne({ email: emailClean });
        if (existingUser) {
            return res.status(400).json({
                errors: {
                email: "Email sudah terdaftar",
                },
            });
        }

        if (!emailClean) {
            errors.email = "Email wajib diisi";
        } else if (!emailClean.endsWith("@gmail.com")) {
            errors.email = "Email harus menggunakan @gmail.com";
        } else {
            const emailUsername = emailClean.split("@")[0];
            if (!emailUsername) {
                errors.email = "Email tidak boleh hanya @gmail.com";
            } else if (/^\d+$/.test(emailUsername)) {
                errors.email = "Email tidak boleh hanya terdiri dari angka";
            } else if (/^\d/.test(emailUsername)) {
                errors.email = "Email tidak boleh diawali dengan angka";
            }
        }

        if (!password) {
            errors.password = "Password wajib diisi";
        }else if (password.length < 5) {
            errors.password = "Password minimal 5 karakter";
        }

        if(Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        res.status(201).json({
            message: "Register berhasil",
            data: user,
        });

    }catch (error) {
        console.error(error);
        res.status(500).json({
        errors: {
            general: "Terjadi kesalahan server",
        },
        });
    }
}

module.exports = { register };
