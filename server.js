const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')

require('dotenv').config()

const app = express()
app.use(morgan('dev'))

const userRoute = require('./Routes/userRoutes')
const imageRoute = require('./Routes/imageRoutes')

app.use((req, res, next) => {
    const start = performance.now();
  
    // Your routes and other middleware go here
  
    const end = performance.now();
    const responseTime = end - start;
  
    console.log(`Response time: ${responseTime}ms`);
  
    next();
  });
  
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