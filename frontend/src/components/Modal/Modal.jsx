
import React, { useState } from 'react'

import { modalStyle, indexStyle, buttonStyle} from '../../styles'
import { useModalContext } from '../../context/ModalContextProvider'

const Modal = ({onConfirm, onClose}) => {
    const {modalTitle, modalText, entityId, modal, toggleModal} = useModalContext()

    if(modal){
        document.body.classList.add('active-modl')
    }else{
        document.body.classList.remove('active-modl')
    }

    return (
        <>  
        {   
            modal && (
            

            <div className={modalStyle.modal}>
                <div className={modalStyle.overlay }>
                    <button className={modalStyle.closeModal} onClick={toggleModal}>X</button>
                </div>
                <div className={modalStyle.modalContent}>
                    <h2>{modalTitle}</h2>
                    <p>
                        {modalText}
                    </p>
                    <div className={modalStyle.modalFooter}>
                        <button className={`${ buttonStyle.btnPrimary } ${modalStyle.acceptModal}`} onClick={() => {
                                onConfirm(entityId)
                        }}>Aceptar</button>
                        <button className={`${ buttonStyle.btnPrimary } ${modalStyle.acceptModal}`} onClick={toggleModal}>Cancelar</button>
                    </div>
                </div>
                
            </div>)
        }
            
        </>
    )
}

export default Modal