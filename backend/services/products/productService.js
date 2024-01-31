const Product = require('../../models/productModel')

const createDefaultProduct = async () => {
    try {
        const prodName = "Smart Tv 50 Pulgadas 4K Ultra HD 50PUD7406/77"
        const existingProduct = await Product.findOne({ name: prodName });
        if (!existingProduct) {
            const defaultProduct = new Product({
                name: prodName,
                category: "Smart Tv 43 Pulgadas Full HD 43A42H",
                brand: "HISENSE",
                price: 219999.56,
                description: "El Smart TV Hisense 43 pulgadas FULL HD (1920 x 1080 píxeles) cuenta con una pantalla de visualización 16:9. La cual brinda una gran calidad de imagen y contraste.",
                currency: "$",
                stock: 3,
                img: {
                    src: "img/tv-hisense-43.jpg",
                    alt: "Smart Tv 43 Pulgadas Full HD 43A42H"
                },
                colors: [
                    {
                        color: "#737CA1",
                        colorName: "Slate Blue Grey"
                    }
                ]
            })
            await defaultProduct.save();
            console.log('Default Product created successfully');
        } else {
            console.log('Default product already exists');
        }

    } catch (error) {
      console.error('Error creating default product:', error);
    } 
};

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

module.exports = {createDefaultProduct, deleteProductsFromMongo, getProducts, getProductsFromMongo, createProductInMongo, getProductsFromMongoById, updateProductByIdFromMongo}