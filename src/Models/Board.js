const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim: true,},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true,},
        type: {type: String, enum: ["my", "team"], default: "my"},
        members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        isDeleted: {type: Boolean, default: false,},
    },
    { timestamps: true}
);

module.exports = mongoose.model("Board", boardSchema);