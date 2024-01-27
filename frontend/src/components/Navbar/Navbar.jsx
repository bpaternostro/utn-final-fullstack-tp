import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { DropDownProfile } from '../'
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa'
import { FaShop } from 'react-icons/fa6'
import { ImHome3 } from 'react-icons/im'
import { RiMessage3Line } from "react-icons/ri";

import { Link, useLocation } from 'react-router-dom'
import { navbarStyle, buttonStyle } from '../../styles'
import { useGlobalContext } from '../../context/GlobalContextProvider'

import { verifyUser } from '../../helpers/verifyToken'
import { ROOT } from '../../apiConfig'

const Navbar = () => {
    const {cart, filterBySearchInputBox, openProfile, setOpenProfile} = useGlobalContext()
    const [show, setShow] = useState(false)
    const location = useLocation();
    const [time, setTime] = useState(new Date());
    const handleShowSearch = () => {
        setShow(!show)
    }
    
    if(localStorage.getItem("username")){
        verifyUser()
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 600000);
    
        return () => clearInterval(interval);
    }, []);

    return (
        <header>
            <div className={navbarStyle.logoBrandContainer}>
                <span><FaShop size={35} color="#4D5E80" /></span>
            </div>
            {
                location.pathname === ROOT ?
                <div className={navbarStyle.searchContainer}>
                    <span>
                        <AiOutlineSearch size={18}/>
                    </span>
                    <input type="text" name="search" id={navbarStyle.searchMobile} placeholder="Buscar ..." onChange={filterBySearchInputBox} />
                </div>:<div></div>
            }
            <div>
                <span>
                    {
                        show && <span style={{"display":"block"}}>
                                    <button className={buttonStyle.btnRemove} onClick={handleShowSearch}>x</button>
                                    <input type="text" name="search" id={navbarStyle.searchMobile} placeholder="Buscar ..." onChange={filterBySearchInputBox}/>
                                </span>
                    }
                </span>
                <span style={{display: show ? "none": "block"}}>
                    <nav>
                        <Link to={`${ROOT}/contact`} title="Contacto">
                            <RiMessage3Line className={navbarStyle.contactLabelIcon} size={18} />
                            { location.pathname === `${ROOT}/contact` ? <span className={navbarStyle.sectionMark} style={{display:"block"}}></span> : <span className={navbarStyle.sectionMark} style={{display:"none"}}></span>}
                        </Link>
                        <Link to={ROOT} title="Marketplace">
                            <ImHome3 size={18}/>
                            { location.pathname === ROOT ? <span className={navbarStyle.sectionMark} style={{display:"block"}}></span> : <span className={navbarStyle.sectionMark} style={{display:"none"}}></span>}
                        </Link>
                        <Link to="" id={navbarStyle.searchNavIcon} onClick={handleShowSearch}>
                                <AiOutlineSearch size={18} />
                        </Link>
                        <Link to={`${ROOT}/cart`} className={navbarStyle.cartBanner} title="Carrito de compras">
                            <div><span className={navbarStyle.cartBubble}>{cart.length}</span></div>
                            <FaShoppingCart size={18}/>
                            { location.pathname === `${ROOT}/cart` ? <span className={navbarStyle.sectionMark} style={{display:"block"}}></span> : <span className={navbarStyle.sectionMark} style={{display:"none"}}></span>}
                        </Link>
                        {
                            localStorage.getItem('username') ?
                                <div className={navbarStyle.profileMenu}>
                                    <span className={navbarStyle.nickName} onClick={() => setOpenProfile(!openProfile)}><span role="img" aria-label="waving-hand">👋</span><span className={navbarStyle.username}>{localStorage.getItem('username')}</span></span>  
                                    {openProfile && <DropDownProfile/>} 
                                </div>
                                :
                                <Link to={`${ROOT}/identify`} id={navbarStyle.login} title="Login / Registrarse">
                                    <FaUserAlt size={18} />
                                </Link>
                        }
                    </nav>
                </span>
            </div>
        </header>
    )
    }

export default Navbar