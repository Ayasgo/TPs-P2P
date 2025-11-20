const User = require('../models/User');

exports.uploadImage = async (req, res) => {
    const { login } = req.body;

    if (!req.file) return res.status(400).send("Aucun fichier envoyé");

    await User.updateOne({ login }, { lastImage: req.file.filename });

    res.json({ msg: "Image uploadée", filename: req.file.filename });
};

exports.showImage = async (req, res) => {
    const user = await User.findOne({ login: req.params.login });

    if (user && user.lastImage) {
        return res.redirect(`/uploads/${user.lastImage}`);
    }
    res.send("Aucune image trouvée pour cet utilisateur.");
};
