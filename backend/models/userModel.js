const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'customer'},
    createdAt: {type: Date, default: Date.now},
}) /*creamos el schema user*/

const User = mongoose.model('user', userSchema)

module.exports = User