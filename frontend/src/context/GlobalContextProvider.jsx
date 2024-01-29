import React, { useContext, createContext, useState, useEffect } from 'react'
import { API_ENDPOINTS } from '../apiConfig'

import axios from 'axios'

const GlobalContext = createContext()
const GlobalContextProvider = ({children}) => {
    const [allProducts, setAllProducts] = useState([])
    const [products, setProductsToShow] = useState([])
    const [productsHasChanged, setProductsHasChanged] = useState(false)
    const [cart, setCart] = useState([])
    const [cartTotal, setCartTotal] = useState()
    const [error, setError] = useState()
    const [currency, setCurrency] = useState('$')
    const [filterFields, setFilterFields] = useState([])
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const [openProfile, setOpenProfile] = useState(false)

    const isInCart = (id) => cart.some(product => product._id == id)
    const findProductCart = (id) => cart.find(product => product._id == id)
    const findProductById = (id) => products.find(prod => prod._id === id)
    const handleDeleteFromCartProduct = (id) => {
        setCart(cart.filter((product) => product._id !== id))
    }
    const handleClickBtn = (id, event) => {
        const productFound = findProductCart(id)
        setError(null)
        if (event.target.className.includes("minus")){
            productFound.quantity > 0 ? productFound.quantity -- : setError("Superaste el limite inferior")
        }else{
            
            productFound.quantity < productFound.stock ? productFound.quantity ++ : setError("Superaste el limite superior")
        }
        setCart([...cart])
    }

    const handleDeleteProduct = (id) => {
        if(findProductCart(id).quantity == 1){
            setCart(cart.filter((product) => product._id !== id))
        }else{
            cart.map((product) => {
                if (product._id === id){
                    product.quantity --
                }
                return product /* si no tiene el return, la funcion devuelve undefined, si o si tiene q tener*/
            })
        }
        
    }
    const handleAddProduct = (id) => {
        /**devuelve un unico producto */
        const productFound = findProductById(id)
        /*esto es para validar si el prodcuto ya esta en el carrito, para cambiar la cantidad de comprados*/
        if(isInCart(id)){
            cart.map((product) => {
                if (product._id === id){
                    product.quantity ++
                }
                return product /* si no tiene el return, la funcion devuelve undefined, si o si tiene q tener*/
            })
        }else{
            /* 
                esto es para no pisar los productos anteriores
                luego generamos una copia de productFound y agregamos la propiedad quantity 
            */
            setCart([...cart, {...productFound, quantity:1}])
        }
    }

    const handleFilterFields = (filter) => {
        filterFields.includes(filter) ? setFilterFields(filterFields.filter((f) => f!== filter)) : setFilterFields([...filterFields, filter])
    }

    const productMustBeDisplayed = (product) => {
        return filterFields.map(f => product[f.split('-')[0]] === f.split('-')[1]).filter(v => v).length
    }

    const filterBySearchInputBox = (evento) => {
        console.log(evento.target.value.toLowerCase())
        let normalizedString = evento.target.value.toLowerCase()
        if(normalizedString) {
            setProductsToShow(allProducts.filter(p => p.name.toLowerCase().includes(normalizedString) || p.category.toLowerCase().includes(normalizedString) || p.brand.toLowerCase().includes(normalizedString)))
        }else{
            filterFields.length ? setProductsToShow(allProducts.filter(p => productMustBeDisplayed(p))) : setProductsToShow(allProducts)
        }
    }

   
    useEffect(() => {
        filterFields.length ? setProductsToShow(allProducts.filter(p => productMustBeDisplayed(p))) : setProductsToShow(allProducts)
    },[filterFields])

    useEffect(() => {
        setCartTotal(cart.reduce( (total, current) => (total = total + (current.price * current.quantity)), 0).toFixed(2))
    },[cart])
    
    useEffect(() => {
        axios.get(API_ENDPOINTS.products)
        .then(res =>{
            setAllProducts(res.data.products)
            setProductsToShow(res.data.products)
            setBrands([...new Set(res.data.products.map(item => item.brand))])
            setCategories([...new Set(res.data.products.map(item => item.category))])
            setProductsHasChanged(false)
        })
    },[productsHasChanged])
    

    return (
        <GlobalContext.Provider value={{
            allProducts,
            brands, 
            cart, 
            setCart,
            cartTotal, 
            products, 
            categories, 
            currency, 
            filterFields, 
            handleAddProduct, 
            isInCart, 
            findProductCart, 
            filterBySearchInputBox, 
            handleDeleteProduct, 
            handleDeleteFromCartProduct, 
            handleFilterFields, 
            handleClickBtn,
            openProfile, 
            setOpenProfile,
            setFilterFields,
            productsHasChanged,
            setProductsHasChanged}}>
            {children}
        </GlobalContext.Provider>
    )
}

/*cremos un custom Hook para utilizar el contexto */
export const useGlobalContext = () => useContext(GlobalContext)

export default GlobalContextProvider