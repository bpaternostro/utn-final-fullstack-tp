import React, { useState } from 'react'
import { productCardStyle, indexStyle  } from '../../styles'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS, ROOT } from '../../apiConfig'

const Productcard = ({ name, category, price, currency, stock, img, _id }) => {
  return (
    <Link to={`${ROOT}/detail/${_id}`} className={`${ productCardStyle.product } ${indexStyle.boxContainer}`} style={{pointerEvents: stock > 0 ? '' : 'none'}}>
        <span className={productCardStyle.imageContainer}>
          <img src={`${API_ENDPOINTS.images}/${img.src}`} alt={img.alt} />
        </span>
        <span className={productCardStyle.productName}>{name}</span>
        <span className={productCardStyle.priceBanner}>
            <span className={productCardStyle.currency}>{currency}</span>
            <span className={productCardStyle.price}>{price.toLocaleString('en-US')}</span>
        </span>
        <span className={productCardStyle.quantity}>
          <span className={productCardStyle.categoryName}>{category}</span>
          <span className={productCardStyle.stockBanner}>
              {stock > 0 ? <span className={productCardStyle.stockMessage}>Stock Disponible <span className='stock'>({stock})</span></span>: <span className={`${ productCardStyle.stockMessage } ${productCardStyle.noStockMessage}`}>Sin Stock</span>}
          </span>
        </span>
    </Link>
  )
}

export default Productcard