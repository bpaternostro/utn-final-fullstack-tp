const Product = require('../../models/productModel')

const getProductsFromMongo = async (limit) => {
    return await Product.find({}).sort({createdAt: -1}).limit(limit)
}

const getProductsFromMongoById = async (id) => {
    return await Product.findOne({_id:id}).orFail() 
}

const getProducts = async () =>{
    return await Product.find({})
}

const createProductInMongo = async (prod) =>{
    return await Product.create(prod)
}

const updateProductByIdFromMongo = async (pid, newProd) => {
    return await Product.findOneAndUpdate({_id:pid}, newProd, {new: true})
}

const deleteProductsFromMongo = async (id) => {
    return await Product.deleteOne({_id: id}).orFail()
}

module.exports = {deleteProductsFromMongo, getProducts, getProductsFromMongo, createProductInMongo, getProductsFromMongoById, updateProductByIdFromMongo}