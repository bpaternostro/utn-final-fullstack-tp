import React, {useEffect } from 'react'
import {adminStyle, buttonStyle, indexStyle} from '../styles'
import { Link, useNavigate } from 'react-router-dom'
import { Productrow, Modal } from '../components'
import { isAdmin, verifyToken } from '../helpers/verifyToken'
import { useGlobalContext } from '../context/GlobalContextProvider'
import { useModalContext } from '../context/ModalContextProvider'
import { API_ENDPOINTS } from '../apiConfig'
import { HiOutlinePlusCircle } from "react-icons/hi";

const Admin = () => {
  const navigate = useNavigate()
  const {products, setProductsHasChanged} = useGlobalContext()
  const {toggleModal, setModalText, setModalError, setEntityId} = useModalContext()
  
  const handleDelete = (id) => {  
    fetch(`${API_ENDPOINTS.products}/${id}`, 
    {
      method: "DELETE",
      headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth-token-app')},
    })
    .then((res) => {
      toggleModal(false)
      setProductsHasChanged(true)
      setEntityId(false)
      setError(false)
      return
    })
    .catch((err) => {
      setModalError(true)
      setModalText("Existieron inconvenientes en la eliminación del producto")
      toggleModal(true)
      return
    })
  }

  useEffect(() => {
    if(!isAdmin()){
      navigate('/')
    }
  },[])

  return (
    <main>
      <Modal onConfirm={handleDelete} onClose={toggleModal} />
      <div className={ adminStyle.mainContainer }>
        <div className={ adminStyle.adminSectionContainer }>
          <div className={ adminStyle.adminSections}>
              <div className={ adminStyle.toolbar}>
                <Link className={ buttonStyle.btnPrimary } to='/create-product'><HiOutlinePlusCircle title="Crear producto" size={25} /> Producto</Link>
              </div>
               <div className={ adminStyle.adminTable}>
                <div className={ adminStyle.adminTableBody}>  
                  {
                    products.map((product) =>(
                        <Productrow {...product} key={product._id} />
                    ))
                  }
                </div>
               </div>
          </div>
        </div>
      </div>        
    </main>
    
  )
}

export default Admin