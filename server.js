require('./dbConn')
const express = require('express')
const bodyParser = require('body-parser')
const signup = require('./routes/Signup')




const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(signup)










const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Port app listening on port ${port}`))