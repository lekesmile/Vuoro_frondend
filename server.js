require('./dbConn')
const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./routes/Auth')
const workers = require('./routes/Workers')
var cors = require('cors');






const app = express()

// Cross-origin
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.use(auth)

app.use(workers)







const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Port app listening on port ${port}`))