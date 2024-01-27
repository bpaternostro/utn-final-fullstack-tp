import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Admin, Cart, CreateProduct, Contact, EditProduct, Error404, Home, Identify, Login, Register, ProductDetail, Success, UnderConstruction} from '../pages'
import '../styles/index.module.css'
import { ROOT } from '../apiConfig'
const PageRouter = () => {
  return (
    <>
      <Routes>
            <Route path={ROOT} element={<Home/>} />
            <Route path={`${ROOT}/admin`} element={<Admin/>} />
            <Route path={`${ROOT}/identify`} element={<Identify/>} />
            <Route path={`${ROOT}/register`} element={<Register/>} />
            <Route path={`${ROOT}/login`} element={<Login/>} />
            <Route path={`${ROOT}/contact`} element={<Contact/>} />
            <Route path={`${ROOT}/detail/:id`} element={<ProductDetail/>} />
            <Route path={`${ROOT}/create-product`} element={<CreateProduct/>} />
            <Route path={`${ROOT}/edit-product/:id`} element={<EditProduct/>} />
            <Route path={`${ROOT}/cart`} element={<Cart/>} />
            <Route path={`${ROOT}/profile`} element={<UnderConstruction/>} />
            <Route path={`${ROOT}/settings`} element={<UnderConstruction/>} />
            <Route path={`${ROOT}/under-construction`} element={<UnderConstruction/>} />
            <Route path={`${ROOT}/success`} element={<Success/>} />
            <Route path='*' element={<Error404/>} /> 
      </Routes>
    </>
  )
}

export default PageRouter