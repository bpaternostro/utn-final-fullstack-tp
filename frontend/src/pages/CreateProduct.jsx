import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ProductForm } from '../components'
import { isAdmin } from '../helpers/verifyToken'
import { ROOT } from '../apiConfig'

const CreateProduct = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!isAdmin()){
      navigate(ROOT)
    }
  },[])

  return (
    <main>
        <ProductForm id={""} />
    </main>
  )
}

export default CreateProduct