import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { ProductForm } from '../components'
import { isAdmin } from '../helpers/verifyToken'

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!isAdmin()){
      navigate('/')
    }
  },[])
  
  return (
    <main>
        <ProductForm id={id} />
    </main>
  )
}

export default EditProduct