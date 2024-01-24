import React, { useState } from 'react'
import { buttonStyle,cartProductCardStyle } from '../../styles'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContextProvider'
import { API_ENDPOINTS } from '../../apiConfig'
const CardProductcard = ({ name, category, price, currency, stock, img, quantity, _id }) => {
  const {counter, handleClickBtn, handleDeleteProduct, handleDeleteFromCartProduct} = useGlobalContext()
  return (
    <div className={cartProductCardStyle.product}>
        <span className={cartProductCardStyle.buttonContainerHeader}>
          <button className={buttonStyle.btnRemove} onClick={() => handleDeleteFromCartProduct(_id)}>x</button>
        </span>
        <span className={cartProductCardStyle.imageContainer}>
          <img src={`${API_ENDPOINTS.images}/${img.src}`} alt={img.alt} />
        </span>
        <span className={cartProductCardStyle.productBanner}>
          <span className={cartProductCardStyle.categoryName}>{category}</span>
          <span className={cartProductCardStyle.productName}>{name}</span>
        </span>
        <span className={cartProductCardStyle.priceQuantityBanner}>
            <span className={cartProductCardStyle.priceBanner}>
              <span className={cartProductCardStyle.currency}>{currency}</span>
              <span className={cartProductCardStyle.price}>{price.toLocaleString('en-US')}</span>
              <span className={cartProductCardStyle.quantity}>{`* ${quantity}`}</span>  
            </span>
            <span>
              <span className={cartProductCardStyle.quantityManager}>
                  <button className={ cartProductCardStyle.minus } onClick={(event) => handleClickBtn(_id, event)}>-</button>
                  <span>{quantity}</span>
                  <button className={ cartProductCardStyle.plus } onClick={(event) => handleClickBtn(_id, event)}>+</button>
              </span>
              <span className={ cartProductCardStyle.stock }>{`Stock disponible (${stock})`}</span>
            </span>
        </span>
        <span className={cartProductCardStyle.buttonContainerFooter}>
          <button className={buttonStyle.btnRemove} onClick={() => handleDeleteFromCartProduct(_id)}>x</button>
        </span>
        
    </div>
  )
}

export default CardProductcard