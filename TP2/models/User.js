const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    login: { type: String, unique: true },
    password: String,
    lastImage: String
});

module.exports = mongoose.model('User', UserSchema);
