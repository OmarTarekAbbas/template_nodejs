const Jwt = require("jsonwebtoken");


module.exports = function (req, res, next) {
    const token = req.header('auth-token')
    if (!token) return res.status(404).send("Access Denied")
    try {
        const verified = Jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        console.log("test  " + req.user.email)
        next();
    } catch (error) {
        console.log("omar  " + token)
        res.status(404).send("Invailed Token")
    }

}