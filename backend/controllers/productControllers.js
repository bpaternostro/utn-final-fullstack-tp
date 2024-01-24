const { deleteProductsFromMongo, getProductsFromMongo, createProductInMongo, getProductsFromMongoById, updateProductByIdFromMongo } = require('../services/products/productService')

const getProducts = async (req, res) => {
    const {limit} = req.query
    const result = await getProductsFromMongo(limit)
    res.status(200).json({message:"ok", products : result})
}

const getProductById = async (req, res) => {
    const {id} = req.params
    try{
        const result = await getProductsFromMongoById(id)
        return res.status(200).json({message: "product found", product: result})
    }catch(error){
        return res.status(404).json({message: "not found"})
    }
}

const createProduct = async (req, res) => {
    const {name, description, category, brand, currency, img, colors, stock,  price} = req.body
    if(name && description && stock && price && currency && img && colors && category && brand){
        try{
            const result = await createProductInMongo(req.body)
            res.status(201).json({message: "product created"})
        }catch(error){
            console.log("there was an error with the product creation:" + error)
            res.status(500).json({message: 'internal server error'})
        }
    }else{
        return res.status(400).json({message: 'bad request'})
    }
}

const updateProductById = async (req, res) => {
    const {id} = req.params
    const newProd = req.body
    const result = updateProductByIdFromMongo(id, newProd)
    if (result){
        return res.status(200).json({product: newProd})
    }else{
        return res.status(404).json({message: "bad request, please check product attr or product ID"})
    }
}

const deleteProductById = async (req, res) => {
    const {id} = req.params
    try{
        const result = await deleteProductsFromMongo(id)
        return res.status(200).json({message: "product deleted correctly"})
    }catch(error){
        return res.status(404).json({message: "not found"})
    }
}

const uploadImage = async (req, res) => {
    return res.status(201).json({message: `image was uploaded in ${process.env.IMAGE_LOCATION}`})
}

module.exports = {getProducts, getProductById, createProduct, updateProductById, deleteProductById, uploadImage}