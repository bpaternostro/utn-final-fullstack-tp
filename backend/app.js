const dotenv = require('dotenv')
const express = require('express')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const cors = require('cors')

dotenv.config()

const dbConfig = require('./db/dbConfig')
app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))
app.use(express.json())

const PORT = process.env.PORT
const ROOT = process.env.ROOT
const productRouter = require('./router/productRouter')
const authRouter = require('./router/authRouter')

app.use(ROOT + '/img', express.static(process.env.IMAGE_LOCATION));
app.use(ROOT + '/products', productRouter)
app.use(ROOT + '/auth', authRouter)


app.listen(PORT, () => {
    console.log("Hello!!! this is the backend running in http://localhost:"+PORT)
})