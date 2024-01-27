import React from 'react'
import { CartProductcard } from '../components'
import {cartStyle, buttonStyle, indexStyle} from '../styles'

import { useGlobalContext } from '../context/GlobalContextProvider'
import { Link } from 'react-router-dom'
import { ROOT } from '../apiConfig'
const Cart = () => {
  const {cart, cartTotal, currency} = useGlobalContext()
  return (
    
    <main>
      <div className={ cartStyle.cart }>
        <div className={ cartStyle.cartProductContainer }>
          <div className={ cartStyle.cartProducts}>
              {
                  cart.map((product) =>(
                      <CartProductcard {...product} key={product._id}/>
                  ))
              }
          </div>
          <div>
            {
              cart.length ?
              <Link className={buttonStyle.btnPrimary} to={ROOT} >Agregar mas productos</Link> :
              <span></span>
            }
          </div>

        </div>
        <div className={ cartStyle.cartTotal }>
          <div className={`${ cartStyle.cartTotalContainer} ${indexStyle.boxContainer}`}  >
            <span className={ cartStyle.productTitle }>Total</span>
            <span className={ cartStyle.totalPrice }>{`${currency} ${Number(cartTotal).toLocaleString('en-US')}`}</span>
            <button className={buttonStyle.btnPrimary}>Compra</button>
          </div>
        </div>
      </div>        
    </main>
    
  )
}

export default Cart