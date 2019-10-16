const express = require('express')
const router = express.Router()
const User = require('../models/UserSchema')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const secret = 'jwtSecret'



router.post('/signup', (req, res) => {

    try {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            // Store hash in your password DB.

            const newUser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash

            })
            newUser.save()
                .then(() => {
                    jwt.sign({ id: User.id }, secret, { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        res.status(201).send({ Message: 'User registered', newUser, 'token ': token })
                    })
                }).catch((err) => {
                    res.status(404).send(err.message)
                })

        })
    } catch (error) {
        return error
    }

});


router.post('/login', (req, res) => {

    User.findOne({ email: req.body.email }, function (err, foundUser) {
        if (err) {
            res.status(404).send(req.body.email + ' No user found in the database')
        } else {
            if (foundUser) {
                bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
                    // result === true
                    if (result === true) {
                        jwt.sign({ id: User.id }, secret, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err;
                            res.status(201).send({ Message: 'User found', foundUser, 'token ': token })
                        })

                    } else {
                        return res.status(400).send('Wrong password')
                    }

                });
            }
        }
    })
})


module.exports = router