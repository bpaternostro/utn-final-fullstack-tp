import axios from 'axios'
import { API_ENDPOINTS, ADMIN_ROLE, ROOT } from '../apiConfig'

import { jwtDecode } from 'jwt-decode';

export const verifyToken = (navigate) =>{
    axios.get(API_ENDPOINTS.verify,
      {headers: {'Authorization': localStorage.getItem('auth-token-app')}})
      .then((res) => {
        return true
      })
      .catch( (err) => {
        console.log(err)
        navigate(`${ROOT}/login`)
        return
      })
}

export const verifyUser = () =>{
  axios.get(API_ENDPOINTS.verify,
    {headers: {'Authorization': localStorage.getItem('auth-token-app')}})
    .then((res) => {
      return true
    })
    .catch( (err) => {
      localStorage.setItem('auth-token-app', '')
      localStorage.setItem('username', '')
    })
}


export const isAdmin = () => {
  const token = localStorage.getItem('auth-token-app')
  if(!token){
    return false
  }
  const decoded = jwtDecode(token)
  return decoded.role === ADMIN_ROLE ? true : false
}


export const getUserId = () => {
  const token = localStorage.getItem('auth-token-app')
  if(!token){
    return false
  }
  const decoded = jwtDecode(token)
  return decoded.id
}