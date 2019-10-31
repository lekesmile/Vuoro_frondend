const express = require('express')
const router = express.Router()
const User = require('../models/UserSchema')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
require('dotenv').config();

// const authChecker = require('../middleware/authChecker')



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
                    jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        return res.status(201).send({ "Message": 'User registered', newUser, 'token': token })
                    })

                }).catch((err) => {
                    return res.status(404).send(err.message)
                })

        })
    } catch (error) {
        return error
    }

});


router.post('/login', (req, res) => {

    User.findOne({ email: req.body.email }, function (err, foundUser) {
        if (err) {
            return res.status(404).send(req.body.email + ' No user found in the database')
        } else {
            if (foundUser) {
                bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
                    // result === true
                    if (result === true) {
                        jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err;
                            return res.status(201).json({ "Message": 'successfull logged in', foundUser, 'token': token })
                        })
                        console.log(foundUser)
                    } else {
                        return res.status(400).send('Wrong password')
                    }

                });
            }
        }
    })
})


module.exports = router