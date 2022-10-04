const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoute = require('./routes/routes')
const authRoute = require('./routes/auth')
const connection = require('./connections/db')
var logger = require('morgan');

dotenv.config()

connection()

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/',userRoute)
app.use('/auth',authRoute)


app.listen(4000,()=>{
    console.log('server running on port 4000 ');
})