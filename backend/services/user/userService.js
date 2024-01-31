const jwt = require('jsonwebtoken')
const User = require('../../models/userModel')
const TokenBlacklist = require('../../models/tokenModel')

const secretKey = process.env.SECRET_KEY_JWT

const createDefaultUser = async () => {
    try {
      const existingUser = await User.findOne({ email: process.env.ADMIN_USER });
      if (!existingUser) {
        const defaultUser = new User({
          name: 'Admin',
          lastname: 'Admin',
          age: 25,
          email: 'admin@gmail.com',
          password: process.env.ADMIN_PASS,
          role: "admin",
        });
  
        await defaultUser.save();
        console.log('Default user created successfully');
      } else {
        console.log('Default user already exists');
      }
    } catch (error) {
      console.error('Error creating default user:', error);
    }
};

const createUser = async (user) => {
    if (!(await userExist(user.email))) {
        const newUser = new User(user)
        return { ok: true, user: await newUser.save() }
    }
    else {
        console.log('User already created')
        return { ok: false, error: 'Username is not available' }
    }
}

const getUserFromMongoById = async (id) => {
    return await User.findOne({_id:id}).orFail() 
}

const userExist = async (pemail) =>{
    const userExist = await User.findOne({email:pemail})
    return Boolean(userExist)
} 

const userIsAdmin = async (token) =>{
    const decoded = jwt.decode(token)
    const userExist = await User.findOne({email:decoded.username})
    return Boolean(userExist) && decoded.role == "admin"
} 


const loginUser = async (userEmail, password) => {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
        return { ok: false, error: "Username does not exist" };
    }
    if (user.password === password) {
        const token = jwt.sign({username:userEmail, role: user.role, id: user._id, name:user.name, timestamp:Date.now()}, secretKey, {expiresIn: process.env.SESSION_EXPIRES})
        const tokenInList = new TokenBlacklist({token: token})
        return { ok: true, token:  await tokenInList.save() };
    } else {
        return { ok: false, error: "Incorrect password" };
    }
};

const logoutUser = async (token) => {
    return await TokenBlacklist.findOneAndUpdate({token:token}, {isValid: false})
};

const isValidToken = async(token) => {
    TokenBlacklist.findOne({token:token})
    .then((res) => {
        return true
    })
    .catch((err) => {
        console.log(err)
        return false
    })
};

const updateUserByIdFromMongo = async (pid, newUser) => {
    return await User.findOneAndUpdate({_id:pid}, newUser, {new: true})
}

module.exports = {createDefaultUser, createUser, loginUser, logoutUser, userExist, isValidToken, getUserFromMongoById, updateUserByIdFromMongo, userIsAdmin}