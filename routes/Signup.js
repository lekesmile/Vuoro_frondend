const express = require('express')
const router = express.Router()
const user = require('../Schema/UserSchema')
const bcrypt = require('bcrypt');
const saltRounds = 10;



router.post('/signup',  (req, res) => {

    try {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.

        const newUser = new user({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash

        })
        newUser.save()
        .then(() => {
            console.log(newUser)
           res.send(newUser)

             // //    res.redirect('/login')
        }).catch((err)=>{
            res.status(404).send(err.message)
            console.log(err.message)
        
        })
            
    })
    } catch (error) {
        return error
    }

});


router.post('/login', (req, res)=>{
    
     user.findOne({email: req.body.email}, function (err, userfound){
        //  if(err){
        //      res.status(404).send(req.body.email + ' No user found in the database')
        //  }else{
            // console.log(userfound)
            bcrypt.compare(req.body.password, userfound.password).then(function (err, res) {
                // res == true
                if(res){
                    console.log(res + loginTryUser + ' User found ')
                }else{
                    return res.status(400).send('Wrong')
        }
       
    });
    //      }
    })
})


module.exports = router