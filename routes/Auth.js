const express = require('express')
const router = express.Router()
const User = require('../models/UserSchema')
const bcrypt = require('bcrypt');
const saltRounds = 10;



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
                    console.log(newUser)
                    res.status(201).send('User registered')

                }).catch((err) => {
                    res.status(404).send(err.message)
                    console.log(err.message)

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
                        console.log(foundUser + ' User found ')
                        res.status(200).send(foundUser)
                    } else {
                        return res.status(400).send('Wrong password')
                    }

                });
            }
        }
    })
})


module.exports = router