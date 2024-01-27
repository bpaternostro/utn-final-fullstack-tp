import React, {useState, useEffect} from 'react'
import { buttonStyle, contactStyle, indexStyle } from '../styles'
import { Link, useNavigate } from 'react-router-dom'
import { API_ENDPOINTS, ROOT } from '../apiConfig'

import axios from 'axios'
import { getUserId } from '../helpers/verifyToken'
import { RiErrorWarningLine } from "react-icons/ri";

const Register = () => {
  const navigate = useNavigate()
  const [repeatedUser, setRepeatedUser] = useState(false)
  const [problemsUpdating, setProblemsUpdating] = useState(false)
  const [userId, setUserId] = useState(getUserId())
  const [successMsg, setSuccessMsg] = useState(false)
  const [label, setLabel] = useState(userId ? "Perfil de usuario": "Registro de usuario")
  const [buttonLabel, setButtonLabel] = useState(userId ? "Guardar": "Registrar")
  const [canSubmit, setCanSubmit] = useState(false)
  
  const initialValues = {
    name:'',
    lastname:'',
    age:'',
    email:'',
    password: ''
  }
  const [formValues, setFormValues] = useState(initialValues)
  const handleChangeInput = (value, name) => {
    setCanSubmit(true)
    const aux = {...formValues, [name]:value}
    setFormValues(aux)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault() /** Es para prevenir que el formulario se recargue y la pagina*/
    if(!userId){
      axios.post(API_ENDPOINTS.register, formValues)
      .then( resp => {
        navigate(`${ROOT}/login`)
        return
      })
      .catch(error => {
        setRepeatedUser(true)
        return
      })
    }else{
      axios.put(`${API_ENDPOINTS.auth}/${userId}`, formValues, {headers: {'Authorization': localStorage.getItem('auth-token-app')}})
      .then(resp  => {
        setCanSubmit(false)
        setSuccessMsg(true)
        return
      })
      .catch(error => {
        setProblemsUpdating(true)
        return
      })
    }
  }

  useEffect(() => {
    if(!userId){
      return
    }
    axios.get(`${API_ENDPOINTS.auth}/${userId}`, {headers: {'Authorization': localStorage.getItem('auth-token-app')}})
    .then(resp  => {
        setFormValues(resp.data.user)
    })
    
  }, [])

  return (
      <main className={contactStyle.contactContainer}>
        <div className={contactStyle.contactFormContainer}>

           <h1>{label}</h1>
              <form action="Post" onSubmit={(e) => handleSubmit(e)}>
                  <div>
                      <label>Email</label>
                      <span className={indexStyle.warningContainer}>
                        <input name="email" type="email" required value={formValues.email} onChange={(e) => handleChangeInput(e.target.value, e.target.name)}/>
                        <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                      </span>
                      <label>Password</label>
                      <span className={indexStyle.warningContainer}>
                        <input name="password" minLength="6" type="password" required value={formValues.password} onChange={(e) => handleChangeInput(e.target.value, e.target.name)}/>
                        <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                      </span>
                      <label>Nombre</label>
                      <input name="name" type="text" required value={formValues.name} onChange={(e) => handleChangeInput(e.target.value, e.target.name)}/>
                      <label>Apellido</label>
                      <input name="lastname" type="text" required value={formValues.lastname} onChange={(e) => handleChangeInput(e.target.value, e.target.name)}/>
                      <label>Edad</label>
                      <input name="age" type="number" required value={formValues.age} onChange={(e) => handleChangeInput(e.target.value, e.target.name)}/>
                      {!userId ? 
                        <div className={contactStyle.forwardLinkContainer}>
                          <span><p>Ya tenes una cuenta?</p></span>
                          <span><Link to={`${ROOT}/login`}>Click aqui!</Link></span>
                        </div>
                        :
                        <div></div>
                      }
                      {
                        repeatedUser && <span>Usuario repetido</span>
                      }
                      {
                        problemsUpdating && <span>Tuvimos problemas para registrar los cambios solicitados</span>
                      }
                      {
                        successMsg && <span>Los cambios solicitados fueron registrados correctamente</span>
                      }
                  </div>
                  <div>
                      <button type='submit' className={buttonStyle.btnPrimary} disabled={!canSubmit ? true:false}>{buttonLabel}</button>
                  </div>
              </form>
        </div>
      </main>    
  )
}

export default Register