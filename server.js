const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')

require('dotenv').config()

const app = express()
const userRoute = require('./Routes/userRoutes')
const imageRoute = require('./Routes/imageRoutes')

app.use(express.json())
app.use(helmet())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get("/api/", (req,res) => {
    res.send("<h1> Hello Helmet!</h1>")
})

app.use('/api/user', userRoute)
app.use('/api/image', imageRoute)

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen((process.env.PORT), () => {
            console.log('Connected to DB and listening to port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })