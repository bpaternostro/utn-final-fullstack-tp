import React, { useEffect, useState, useRef } from 'react'
import { navbarStyle, indexStyle } from '../../styles'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContextProvider'
import { API_ENDPOINTS } from '../../apiConfig'
import { isAdmin } from '../../helpers/verifyToken'

import axios from 'axios'
import { ROOT } from '../../apiConfig'

const DropDownProfile = () => {
    const {openProfile, setOpenProfile, setCart, setFilterFields} = useGlobalContext()
    const navigate = useNavigate()
    const menuRef = useRef()

    const handleLogout = (e) => {
        axios.post(API_ENDPOINTS.logout,{},
            {headers: {'Authorization': localStorage.getItem('auth-token-app')}})
        .then((res) => {
            localStorage.setItem('auth-token-app','')
            localStorage.setItem('username','')
            setOpenProfile(!openProfile)
            setCart([])
            setFilterFields([])
            navigate(ROOT)
            return
        })
        .catch( (err) => {
            console.log(err)
            return
        })
    }

    const handleGoToAdmin = (e) => {
        setOpenProfile(!openProfile)
        navigate(`${ROOT}/admin`)
        return
    }

    const handleGoToProfile = (e) => {
        setOpenProfile(!openProfile)
        navigate(`${ROOT}/register`)
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
        <div ref={menuRef}>
            <ul className={`flex flex-col gap-4 ${ navbarStyle.dropDownProfile}`}>
                <li onClick={(e) => handleGoToProfile(e)}>Profile</li>
                <li onClick={(e) => handleGoToAdmin(e)} style={{display: isAdmin() ? "block": "none"}}>Admin</li>
                <li onClick={(e) => handleLogout(e)}>Logout</li>
            </ul>
        </div>
    )
}


export default DropDownProfile