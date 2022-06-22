const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const filmRoutes = require('./routes/film.routes')

const app = express();

app.use(morgan('dev'))

app.use(express.json())

app.use(filmRoutes)

app.use(cors())



app.use((err, req, res, next) =>{
    return res.json({
        message: error.message
    })
})

app.listen(4000)

console.log('server on port 4000')

