const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
// const fs = require('fs')
const { readdirSync } = require('fs')
require('dotenv').config()


const app = express()

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected')).catch((err) => console.log('DB Connection Error', err))

app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '2mb' }))
app.use(cors())

// app.use('/api', authRoutes)
// fs.readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))


const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on port ${port}`))