const jwt = require('jsonwebtoken')
const { isValidToken, logoutUser } = require('../services/user/userService')

const isAuth = (req, res, next) =>{
    const token = req.header('Authorization')
    if(!token && isValidToken(token)){
        return res.status(401).json({message: "Unauthorized", status: 401})
    }
    try{
        jwt.verify(token, process.env.SECRET_KEY_JWT)
        next()
    }
    catch(error){
        console.log(error)
        logoutUser(token)
        return res.status(401).json({message:"Invalid token", status: 401})
    }
}

module.exports = isAuth