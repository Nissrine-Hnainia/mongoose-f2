//require express
const express = require('express')

//require connectDB to connect db to the application
const connectDB = require('./config/connectDB')

//init app
const app = express()

//require router
const router = require('./routes/router')

//parsing data: JSON 
app.use(express.json()) //middleware

app.use('/', router)

connectDB()
//create the port
const PORT = 5006

//listen to the app 
app.listen(PORT, err => err ? console.log(err) : 
console.log(`The app is listening on port: ${PORT} `))