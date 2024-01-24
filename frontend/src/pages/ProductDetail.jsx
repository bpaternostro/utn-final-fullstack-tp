import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { buttonStyle, indexStyle, productDetailStyle, productCardStyle } from '../styles'
import { useGlobalContext } from '../context/GlobalContextProvider'

import { API_ENDPOINTS } from '../apiConfig'

const ProductDetail = () => {
    const { id } = useParams();
    const {counter, products, handleAddProduct, setActualProduct} = useGlobalContext()
    const [product, setProduct] = useState()
    
    useEffect(() => {
        axios.get(`${API_ENDPOINTS.products}/${id}`)
        .then(resp  => {
            setProduct(resp.data.product)
        })
    }, [])

  return (
    <main>
            {
                product &&    
                <div className={ productDetailStyle.productDetailContainer }>
                    
                    <div>
                        <h2 className={ productDetailStyle.productTitle }>{product.name}</h2>
                    </div>
                    <div>
                        <div className={ indexStyle.boxContainer }>
                            <div className={ productDetailStyle.imageContainer }>
                                <img src={`${API_ENDPOINTS.images}/${product.img.src}`} alt={product.img.alt} />
                            </div>
                            <div className={ productDetailStyle.detailContainer }>
                                <span className={ productDetailStyle.price }>{`${product.currency} ${product.price.toLocaleString('en-US')}`}</span>
                                <span className={productCardStyle.categoryName}>{product.category}</span>    
                                <span className={productCardStyle.stockMessage}>Stock Disponible <span className='stock'>({product.stock})</span></span>
                            </div>
                        </div>
                        <div>
                            <p className={ productDetailStyle.productPara }>
                                {product.description}
                            </p>
                            <div>
                                <span>Colores</span>
                                <div>
                                    {
                                        product.colors.map(c => 
                                            <div key={c.colorName} className={ productDetailStyle.colorCircleContainer }>
                                                <div style={{backgroundColor: c.color}} className={productDetailStyle.colorCircle}></div>
                                                <span className={ productDetailStyle.colorCircleName }>{c.colorName} </span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div>
                                <button className={buttonStyle.btnPrimary} onClick={() => handleAddProduct(id)}>Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
    </main>
  )
}

export default ProductDetail