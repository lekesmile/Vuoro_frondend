const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
         required: true, 
         min :3
    },

    lastname: {
        type: String,
        required: true,
        min: 3
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    
    SignUpDate: {
        type: Date,
        default: Date.now
    }
})

const user = mongoose.model('user', UserSchema)

 module.exports = user