const { exec } = require("child_process");

exports.findFiles = (req, res) => {
    exec("dir", (error, stdout) => {  // "ls -la" sur Linux
        if (error) return res.status(500).send(error.message);
        res.send(`<pre>${stdout}</pre>`);
    });
};
