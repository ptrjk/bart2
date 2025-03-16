const express = require('express')
const db = require('./db')
const cors = require('cors')
const notesRoutes = require('./routes/notesRoutes')
const loginRoutes = require('./routes/loginRoutes')
const verifyToken = require('./controllers/loginController').verifyToken

const port = 5000

const app = express()
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

app.use('/login', loginRoutes)
app.use('/notes', verifyToken, notesRoutes)


app.listen(port, () => console.log(`Server has started on port: ${port} `))