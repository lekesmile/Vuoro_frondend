require('dotenv').config();
const mongoose = require('mongoose')


mongoose.set('useCreateIndex', true);
mongoose.connect(String(process.env.DATABASE_PORT), { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('db connect Ok')
    })
    .catch((err) => {
        console.log(err)
    })
