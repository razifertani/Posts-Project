const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post('/api/user/register', (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash,
        });

        user.save().then((result) => {
            res.status(201).json({
                success: 'true',
                userId: result._id,
            });
        }).catch((err) => {
            res.status(500).json({
                success: 'false',
                error: err,
            });
        });
    });
});

router.post('/api/user/login', (req, res, next) => {
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
                    'secret-key-must-be-protected',
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
                message: err,
            });
        });
});

module.exports = router;
