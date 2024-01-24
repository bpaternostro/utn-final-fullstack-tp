const express = require('express')
const isAuth = require('../middlewares/authMiddleware')
const isAdmin = require('../middlewares/authMiddlewareIsAdmin')
const multer = require('multer');

const { getProducts, getProductById, createProduct, updateProductById, deleteProductById, uploadImage} = require('../controllers/productControllers')

const productRouter = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.env.IMAGE_LOCATION)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const imageUpload = multer({storage: storage})

productRouter.post('/', isAuth, isAdmin, createProduct)
productRouter.get('/', getProducts)
productRouter.get('/:id', getProductById)
productRouter.put('/:id', isAuth, isAdmin, updateProductById)
productRouter.delete('/:id', isAuth, isAdmin,  deleteProductById)
productRouter.post('/image-upload', isAuth, isAdmin,  imageUpload.single("my-image-file"), uploadImage)

module.exports = productRouter