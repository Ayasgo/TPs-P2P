const User = require('../models/User');

exports.login = async (req, res) => {
    const { login, password, nom, prenom } = req.body;

    let user = await User.findOne({ login });
    if (!user) {
        user = new User({ login, password, nom, prenom });
        await user.save();
        return res.json({ msg: "Compte créé et connecté", user });
    }
    if (user.password === password) {
        return res.json({ msg: "Connecté avec succès", user });
    }
    res.status(401).json({ msg: "Mauvais mot de passe" });
};
