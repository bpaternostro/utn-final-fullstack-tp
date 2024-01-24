import React from 'react'
import { Link } from 'react-router-dom'
import { footerStyle } from '../../styles'

const Footer = () => {
  return (
    <footer>
        <div>
            <h3>Diseñador</h3>
            <p>Bruno Paternostro<br></br>
            Made in Argentina</p>
        </div>
        <div>
            <span>
                <h4>Sobre nosotros</h4>
                <Link to="/under-construction">Feedback</Link>
                <Link to="/under-construction">Trabaja con nosotros</Link>
                <Link to="/under-construction">Novedades</Link>
                <Link to="/under-construction">Sobre nosotros</Link>
            </span>
            <span className={footerStyle.howToPlace}>
                <h4>Acerca de nuestro servicio</h4>
                <Link to="/under-construction">Medios de Pago</Link>
                <Link to="/under-construction">Tipos de cambio</Link>
                <Link to="/under-construction">Garantia de servicio</Link>
                <Link to="/under-construction">Seguimiendo de tu pedido</Link>
            </span>
            <span>
                <h4>Contacto</h4>
                <Link to="/contact">Contacto</Link>
                <Link to="/under-construction">Blog</Link>
                <Link to="/under-construction">Redes Sociales</Link>
            </span>
        </div>
        <div>
            <Link to="/under-construction">2030 Comapny. All Rights Reserved.</Link>
            <Link to="/under-construction">Terminos & Condiciones</Link>
            <Link to="/under-construction">Privacy Policy</Link>
        </div>
    </footer>
  )
}

export default Footer