import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { ProductForm } from '../components'
import { isAdmin } from '../helpers/verifyToken'
import { ROOT } from '../apiConfig'

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!isAdmin()){
      navigate(ROOT)
    }
  },[])
  
  return (
    <main>
        <ProductForm id={id} />
    </main>
  )
}

export default EditProduct