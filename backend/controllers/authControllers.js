const {createUser, loginUser, logoutUser, getUserFromMongoById, updateUserByIdFromMongo} = require('../services/user/userService')
const sendEmail = require('../services/mailer/mailService')

const login = async (req, res) => {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    if (result.ok) {
        res.status(200).json({accessToken: result.token})
    } else {
        res.status(401).json({message: 'Invalid credentials'})
    }
}

const register = async (req, res) => {
    const { name, lastname, age, email, password, role } = req.body
    const newUser = { name, lastname, age, email, password, role }
    const result = await createUser(newUser)
    if (result.ok) {
        res.status(201).json({ ok: true, message: 'User was created correctly' })
        const resp = await sendEmail(email, "Usuario creado correctamente", newUser)
    }
    else {
        res.status(400).json({ ok: false, error: result.error })
    }
}

const getUserById = async (req, res) => {
    const {id} = req.params
    try{
        const result = await getUserFromMongoById(id)
        return res.status(200).json({message: "User found", user: result})
    }catch(error){
        return res.status(404).json({message: "Not found"})
    }
}

const updateUserById = async (req, res) => {
    const {id} = req.params
    const newUser = req.body
    const result = updateUserByIdFromMongo(id, newUser)
    if (result){
        return res.status(200).json({user: newUser})
    }else{
        return res.status(404).json({message: "Bad request, please check user attr or user ID"})
    }
}

const logout = async (req, res) =>{
    const token = req.header('Authorization')
    const result = logoutUser(token)
    if (result) {
        res.status(200).json({ ok: true, message: 'Logout process was executed succesfully' })
    }
    else {
        res.status(400).json({ ok: false })
    }
}

const verify = async (req, res) => {
    res.status(200).json({ ok: true, message: 'Valid token'})
}

module.exports = {login, register, verify, logout, getUserById, updateUserById}