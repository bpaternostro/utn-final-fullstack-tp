import React, { useState } from 'react'
import {Filter, Productcard} from '../components'
import { marketplaceStyle } from '../styles'
import { useGlobalContext } from '../context/GlobalContextProvider'

const Home = () => {
  const [selectedProducts, setSelectedProducts] = useState([])
  const {products} = useGlobalContext()
  return (
    <main>
        <div className={ marketplaceStyle.productContainer }>
          <Filter/>
          <div className={ marketplaceStyle.products }>
              {
                  products.map((product) =>(
                      <Productcard {...product} key={product._id} />
                  ))
              }
          </div>
        </div>
    </main>
    
  )
}

export default Home