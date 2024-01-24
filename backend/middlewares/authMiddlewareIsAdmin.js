const jwt = require('jsonwebtoken')
const { userIsAdmin } = require('../services/user/userService')

const authMiddlewareIsAdmin = (req, res, next) =>{
    const token = req.header('Authorization')
    if(!userIsAdmin(token)){
        return res.status(401).json({message: "Unauthorized, user is not admin", status: 401})
    }
    try{
        next()
    }
    catch(error){
        console.log(error)
        return res.status(401).json({message:"Invalid token", status: 401})
    }
}

module.exports = authMiddlewareIsAdmin