require('dotenv').config();
const mongoose = require('mongoose')


mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(String(process.env.DATABASE_PORT), { useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        console.log('Mongodb connect is up and running .....')
    })
    .catch((err) => {
        console.log(err)
    })
