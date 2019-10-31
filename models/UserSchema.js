const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 3
    },

    lastname: {
        type: String,
        required: true,
        min: 3
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password: {
        type: String,
        required: true
    },

    SignUpDate: {
        type: Date,
        default: Date.now
    },


    isAdmin: {
        type: Boolean,
        default: false
    }

});

// UserSchema.methods.generateAuthToken = function (){

// }

const user = mongoose.model('user', UserSchema)

module.exports = user