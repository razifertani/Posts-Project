const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash,
        });

        user.save().then((result) => {
            res.status(201).json({
                success: true,
                userId: result._id,
            });
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: 'User already exists !',
            });
        });
    });
}

exports.login = (req, res, next) => {
    let user;
    User.findOne({ email: req.body.email })
        .then((userfromDB) => {
            if (!userfromDB) {
                return res.status(401).json({
                    success: false,
                    message: "Email not found",
                });
            } else {
                user = userfromDB;
                return bcrypt.compare(req.body.password, user.password)
            }
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid password",
                });
            } else {

                const token = jwt.sign(
                    { email: user.email, userId: user._id },
                    process.env.JWT_KEY,
                    { expiresIn: "1h" },
                );

                return res.status(200).json({
                    success: true,
                    userId: user._id,
                    token: token,
                    expiresIn: 3600,
                });
            }
        })
        .catch(err => {
            return res.status(401).json({
                success: false,
                message: "Wrong password !",
            });
        });
}