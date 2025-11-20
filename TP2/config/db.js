const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/tp_node_db');
        console.log("MongoDB connecté");
    } catch (err) {
        console.error("Erreur MongoDB :", err);
        process.exit(1);
    }
}

module.exports = connectDB;
