import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Admin, Cart, CreateProduct, Contact, EditProduct, Error404, Home, Identify, Login, Register, ProductDetail, Success, UnderConstruction} from '../pages'
import '../styles/index.module.css'

const PageRouter = () => {
  return (
    <>
      <Routes basename="/ecommerce">
            <Route path='/' element={<Home/>} />
            <Route path='/admin' element={<Admin/>} />
            <Route path='/identify' element={<Identify/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/detail/:id' element={<ProductDetail/>} />
            <Route path='/create-product' element={<CreateProduct/>} />
            <Route path='/edit-product/:id' element={<EditProduct/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/profile' element={<UnderConstruction/>} />
            <Route path='/settings' element={<UnderConstruction/>} />
            <Route path='/under-construction' element={<UnderConstruction/>} />
            <Route path='/success' element={<Success/>} />
            <Route path='*' element={<Error404/>} /> 
      </Routes>
    </>
  )
}

export default PageRouter