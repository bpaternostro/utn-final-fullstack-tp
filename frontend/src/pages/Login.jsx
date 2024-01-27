import React, {useEffect, useState} from 'react'
import { buttonStyle, contactStyle, indexStyle } from '../styles'
import { Link, useNavigate } from 'react-router-dom'
import { API_ENDPOINTS, ROOT } from '../apiConfig'
import { isAdmin } from '../helpers/verifyToken'

import { jwtDecode } from 'jwt-decode';
import  axios from 'axios'
import { RiErrorWarningLine } from "react-icons/ri";


const Login = () => {
  const navigate = useNavigate()
  const [errorLogin, setErrorLogin] = useState(false)
  const initialValues = {
    email:'',
    password: ''
  }
  
  const [formValues, setFormValues] = useState(initialValues)
  const handleChangeInput = (value, name) => {
    const aux = {...formValues, [name]:value}
    setFormValues(aux)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault() /** Es para prevenir que el formulario se recargue y la pagina*/
    axios.post(API_ENDPOINTS.login, formValues)
    .then( resp => {
      /* 
        guardamos el token en el local storage, persiste en la memoria del navegador 
      */
      const accessToken = resp.data.accessToken
      const token = accessToken.token
      localStorage.setItem('auth-token-app', token)
      const decoded = jwtDecode(token)
      localStorage.setItem('username', decoded.name)
      if(isAdmin()){
        navigate(`${ROOT}/admin`)
        return
      }else{
        navigate(ROOT)
        return
      }
    })
    .catch(error => {
      console.log(error)
      setErrorLogin(true)
   })
  }


  return (
      <main className={contactStyle.contactContainer}>
        <div className={contactStyle.contactFormContainer}>
              <h1>Login</h1>
              <form action="Post" onSubmit={(e) => handleSubmit(e)}>
                  <div>
                      <label>Email</label>
                      <span className={indexStyle.warningContainer}>
                        <input name="email" type="email" required onChange={(e) => handleChangeInput(e.target.value, e.target.name)}/>
                        <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                      </span>
                      <label>Password</label>
                      <span className={indexStyle.warningContainer}>
                        <input name="password" minLength="6" type="password" required onChange={(e) => handleChangeInput(e.target.value, e.target.name)}/>
                        <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                      </span>
                      <div className={contactStyle.forwardLinkContainer}>
                        <span><p>Si todavia no estas registrado, podes hacerlo aqui:</p></span>
                        <span><Link to={`${ROOT}/register`}>Click aqui!</Link></span>
                      </div>
                  </div>
                  {
                    errorLogin && <span className={indexStyle.errorMessage}>Usuario o contraseña invalidos</span>
                  }
                  <div className={contactStyle.toolBar}>
                      <button type="submit" className={buttonStyle.btnPrimary}>Ingresar</button>
                  </div>
              </form>
        </div>
      </main>    
  )
}

export default Login