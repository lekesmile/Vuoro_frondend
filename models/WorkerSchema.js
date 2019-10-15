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
      required: true,
      
  },
  department:{
      type: String,
      required: true,
    
  },
  salary :{
      type: Number,
      required: true,
     
  }

})

const worker = mongoose.model('worker', workerSchema)
module.exports = worker