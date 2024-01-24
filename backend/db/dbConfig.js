const mongoose = require('mongoose')

const mondoDB_URL = process.env.DB_URI + process.env.DB_NAME

mongoose.connect(mondoDB_URL, {})
const db = mongoose.connection

db.on('error', () => {
    console.log("There was an error in DB connection")
})

db.once("open", () => {
    console.log("Conection was created succesfully")
})

module.exports = mongoose