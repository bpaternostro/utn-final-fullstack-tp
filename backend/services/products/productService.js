const Product = require('../../models/productModel')

const createDefaultProduct = async () => {
    try {
        const defaultProduct = new Product({
            name: "Smart Tv 50 Pulgadas 4K Ultra HD 50PUD7406/77",
            category: "SMART TV",
            brand: "Phillips",
            price: 219999.56,
            description: "Televisor Smart Android de 50'' LED 4K UHD. Potencia 20W. Resolucion 3840 x 2160. Salidas de audio digital (optica) Dolby Atmos. Bluetooth. Wi Fi. Entrada video componente. 2 Entradas USB. 4 Entradas HDMI. Incluye Control remoto, Guia de inicio rapida, Folleto legal y de seguridad, Cable de alimentacion, Soporte para la mesa, 2 pilas AAA.",
            currency: "$",
            stock: 3,
            img: {
                src: "tv-phillips-50.jpg",
                alt: "Smart Tv 50 Pulgadas 4K Ultra HD 50PUD7406/77 - PHILIPS"
            },
            colors: [
                {
                    color: "#737CA1",
                    colorName: "Slate Blue Grey"
                }
            ]
        });
  
        await defaultProduct.save();
        console.log('Default Product created successfully');

    } catch (error) {
      console.error('Error creating default product:', error);
    } finally {
      // Close the MongoDB connection after creating the default user
      mongoose.connection.close();
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