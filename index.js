require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const accountRegisterRoute = require("./src/Account/Register/Route");
const accountLoginRoute = require("./src/Account/Login/Route");
const createBoardRoute = require("./src/Workspace/Boards/Route");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());


// ===== CONNECT DB =====
mongoose
  .connect(
    "mongodb+srv://Tes12345678:h9e7UcVnpBBA45ZQ@cluster0.mxmjwca.mongodb.net/latihan6?retryWrites=true&w=majority",
    {
      serverSelectionTimeoutMS: 5000,
    }
  )
  .then(() => {
    console.log("MongoDB ATLAS TERHUBUNG");
  })
  .catch((err) => {
    console.error("MongoDB GAGAL:", err.message);
  });

// ===== ROUTES (DI LUAR) =====
app.use("/api/v1/account", accountRegisterRoute);
app.use("/api/v1/account", accountLoginRoute);
app.use("/api/v1/workspace", createBoardRoute);

// ===== SERVER =====
app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});
