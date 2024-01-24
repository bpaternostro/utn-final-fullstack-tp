import React, { useEffect, useState, useRef } from 'react'
import { navbarStyle, indexStyle } from '../../styles'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContextProvider'
import { API_ENDPOINTS } from '../../apiConfig'
import { isAdmin } from '../../helpers/verifyToken'


import axios from 'axios'

const DropDownProfile = () => {
    const {openProfile, setOpenProfile} = useGlobalContext()
    const navigate = useNavigate()
    const menuRef = useRef()

    const handleLogout = (e) => {
        axios.post(API_ENDPOINTS.logout,{},
            {headers: {'Authorization': localStorage.getItem('auth-token-app')}})
        .then((res) => {
            localStorage.setItem('auth-token-app','')
            localStorage.setItem('username','')
            setOpenProfile(!openProfile)
            navigate('/')
            return
        })
        .catch( (err) => {
            console.log(err)
            return
        })
    }

    const handleGoToAdmin = (e) => {
        setOpenProfile(!openProfile)
        navigate('/admin')
        return
    }

    const handleGoToProfile = (e) => {
        navigate('/register')
        return
    }

    useEffect(() => {
        let handler = (e) => {
            if(!menuRef.current.contains(e.target)){
                setOpenProfile(false)
            }
            
        }
        document.addEventListener('mousedown', handler);

        return() =>{
            document.removeEventListener('mousedown', handler)
        }
    }, []);


    return (
        <div className='flex flex col' ref={menuRef}>
            <ul className={`flex flex-col gap-4 ${ navbarStyle.dropDownProfile}`}>
                <li onClick={(e) => handleGoToProfile(e)}>Profile</li>
                <li onClick={(e) => handleGoToAdmin(e)} style={{display: isAdmin() ? "block": "none"}}>Admin</li>
                <li onClick={(e) => handleLogout(e)}>Logout</li>
            </ul>
        </div>
    )
}


export default DropDownProfile