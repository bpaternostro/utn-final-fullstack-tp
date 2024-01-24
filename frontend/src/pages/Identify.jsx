import { buttonStyle, identifyStyle, indexStyle } from '../styles'
import { Link, useNavigate } from 'react-router-dom'
const Identify = () => {

  return (
      <main className={identifyStyle.identifyContainer}>
        <div className={identifyStyle.identifyButtonContainer}>
              <h1>Bienvenido a nuestro Marketplace!</h1>
              <div>
                <div className={indexStyle.boxContainer}>
                  <span><h3>Si todavia no estas registrado</h3></span>
                  <span><Link className={buttonStyle.btnPrimary} to="/register">Registrate</Link></span>
                </div>
                <div className={indexStyle.boxContainer}>
                  <span><h3>Si ya dispones de un usuario</h3></span>
                  <span><Link className={buttonStyle.btnPrimary} to="/login">Ingresar</Link></span>
                </div>
              </div>
        </div>
      </main>    
  )
}

export default Identify