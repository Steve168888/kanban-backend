require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const accountRegisterRoute = require("./src/Account/Register/Route");
const accountLoginRoute = require("./src/Account/Login/Route");
const boardRoute = require("./src/Workspace/Boards/Route");

const app = express();
app.use(cors());
app.use(express.json());

// ===== CONNECT DB (PAKAI .env) =====
mongoose
	.connect(process.env.MONGO_URL, {
		serverSelectionTimeoutMS: 5000,
	})
	.then(() => {
		console.log("MongoDB ATLAS TERHUBUNG");
	})
	.catch((err) => {
		console.error("MongoDB GAGAL:", err.message);
	});

// ===== ROUTES =====
app.use("/api/v1/account", accountRegisterRoute);
app.use("/api/v1/account", accountLoginRoute);
app.use("/api/v1/workspace", boardRoute);

// ===== SERVER =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server jalan di http://localhost:${PORT}`);
});
