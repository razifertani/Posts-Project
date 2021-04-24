const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token == undefined) {
        return res.status(401).json({ message: "Token is required !" });
    } else {
        try {
            const decodedToken = jwt.verify(token, "secret-key-must-be-protected");
            req.userData = {
                userId: decodedToken.userId,
                email: decodedToken.email,
            };

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token !",
            });

        }
    }
}