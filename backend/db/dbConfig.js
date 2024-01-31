const mongoose = require('mongoose')
const {createDefaultUser} = require('../services/user/userService')
const {createDefaultProduct} = require('../services/products/productService')

const mondoDB_URL = process.env.DB_URI + process.env.DB_NAME

mongoose.connect(mondoDB_URL, {})
const db = mongoose.connection

db.on('error', () => {
    console.log("There was an error in DB connection")
})

db.once("open", () => {
    console.log("Conection was created succesfully")
    createDefaultUser();
    createDefaultProduct();
})

const createDefaultProduct = async () => {
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
    } finally {
      // Close the MongoDB connection after creating the default user
      mongoose.connection.close();
    }
  };
module.exports = mongoose