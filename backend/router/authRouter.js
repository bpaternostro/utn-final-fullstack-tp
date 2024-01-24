const express = require('express')

const isAuth = require('../middlewares/authMiddleware')
const { getUserById, login, register, verify, logout, updateUserById} = require('../controllers/authControllers')

const authRouter = express.Router()

authRouter.get('/verify', isAuth, verify)
authRouter.post('/logout', isAuth, logout)
authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.put('/:id', isAuth, updateUserById)
authRouter.get('/:id', isAuth, getUserById)


module.exports = authRouter