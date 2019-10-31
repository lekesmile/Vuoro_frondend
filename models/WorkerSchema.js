const mongoose = require('mongoose')

const workerSchema = new mongoose.Schema({
  firstname :{
        type: String,
        required: true,
        min: 3
  },
  lastname :{
      type: String,
      required: true,
      min: 3
  },
  email:{
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      
  },
  department:{
      type: String,
      required: true,
    
  },
  salary :{
      type: Number,
      required: true,
      min: 0
      
     
  }

})

const worker = mongoose.model('worker', workerSchema)
module.exports = worker