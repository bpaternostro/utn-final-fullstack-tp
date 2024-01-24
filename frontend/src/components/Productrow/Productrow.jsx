import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { adminStyle, indexStyle, buttonStyle  } from '../../styles'
import { API_ENDPOINTS } from '../../apiConfig';
import { useGlobalContext } from '../../context/GlobalContextProvider'
import { useModalContext } from '../../context/ModalContextProvider'

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { VscTools } from "react-icons/vsc";
import { MdNumbers } from "react-icons/md";
import { IoMdPricetags } from "react-icons/io";

const Productrow = ({ name, description, category, price, currency, stock, img, _id }) => {
  const [error, setError] = useState(false)
  const [msg, setMsg] = useState('')
  const {setProductsHasChanged} = useGlobalContext()
  const {modalOk, setModalTitle, setModalText, toggleModal, setEntityId} = useModalContext()
  
  
  const handlePopUp = () => {
    setEntityId(_id)
    setModalTitle("Eliminar producto")
    setModalText(`Usted esta por eliminar ${name}. Esta acción eliminara de manera permanente el producto. Desea continuar?`)
    toggleModal(true)
  }

  return (
        <div className={adminStyle.adminRow}>
          <div>
            <span className={adminStyle.productImageContainer}>
                <img className={adminStyle.productImage} src={`${API_ENDPOINTS.images}/${img.src}`} alt={img.alt} />
            </span>
            <span>
              {name}
            </span>
          </div>
          <div>
            <span className={adminStyle.descriptionCol}>
              {description}
            </span>
          </div>
          <div>
            <span>
              <IoMdPricetags size={18} color={"#4D5E80"} className={adminStyle.iconTable}/>
              <span className={adminStyle.adminTableBubble}>{`${currency} ${price.toLocaleString('en-US')}`}</span>
            </span>
            <span>
              <BiCategory size={18} color={"#4D5E80"} className={adminStyle.iconTable}/>
              <span className={adminStyle.adminTableBubble}>{category}</span>
            </span>
            <span>
              <MdNumbers size={18} color={"#4D5E80"} className={adminStyle.iconTable}/>
              <span className={adminStyle.adminTableBubble}>{stock}</span>
            </span>
          </div>
          <div>
            <span>
              <VscTools size={18} className={adminStyle.iconTable}/>
              <span className={adminStyle.adminTableBubble}>
                <Link to={`/edit-product/${_id}`}><FaEdit size={18} color={"#4D5E80"} title="Editar producto"/></Link>
                <button onClick={handlePopUp}><MdDelete size={18} color={"#4D5E80"} title="Eliminar producto" /></button>
              </span>
            </span>
          </div>
        </div>
  )
}

export default Productrow