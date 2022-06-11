const path = require('path')

const express = require('express')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(usersRouter)
app.use(indexRouter)

app.listen(3000)