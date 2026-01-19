const jwt = require("jsonwebtoken");

const JWT_SECRET = "ini_secret_rahasia_kamu"; 

module.exports = (req, res, next) => {
  try {
    // ambil header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        errors: { general: "Token tidak ditemukan" },
      });
    }

    // format: Bearer <token>
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        errors: { general: "Token tidak valid" },
      });
    }

    // verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // simpan ke request
    req.user = {
      id: decoded.id,
    };

    next(); // lanjut ke controller

  } catch (error) {
    return res.status(401).json({
      errors: { general: "Token tidak valid atau expired" },
    });
  }
};
