const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token == undefined) {
        return res.status(401).json({ message: "Token is required !" });
    } else {
        try {
            jwt.verify(token, 'secret-key-must-be-protected');
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token is invalid !" });

        }
    }
}