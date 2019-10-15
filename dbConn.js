require('dotenv').config();
const mongoose = require('mongoose')


mongoose.set('useCreateIndex', true);
mongoose.connect(String(process.env.DATABASE_PORT), { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify : false})
    .then(() => {
        console.log('Mongodb connect is up and running .....')
    })
    .catch((err) => {
        console.log(err)
    })
