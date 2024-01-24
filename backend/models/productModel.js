const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    src: {type: String, required: true},
    alt: {type: String, required: true},
}) /*creamos el schema image*/

const colorSchema = new mongoose.Schema({
    color: {type: String, required: true},
    colorName: {type: String, required: true},
}) /*creamos el schema color*/

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    brand: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    currency: {type: String, required: true},
    img: {
        type: imageSchema,
        required: false,
    },
    colors: {
        type: [colorSchema],
        required: false,
    },
    stock: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now}
}) /*creamos el schema product*/

const Product = mongoose.model('product', productSchema)
const Image = mongoose.model('image', imageSchema)
const Color = mongoose.model('color', colorSchema)

/*prod1.save()*/
module.exports = Product