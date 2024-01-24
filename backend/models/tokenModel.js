const mongoose = require('mongoose')

const tokenBlacklistSchema = new mongoose.Schema({
    token: {type: String, required: true},
    isValid: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now},
})

const TokenBlacklist = mongoose.model('tokenBlacklist', tokenBlacklistSchema)

module.exports = TokenBlacklist