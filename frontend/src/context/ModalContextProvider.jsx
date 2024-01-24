import React, { useContext, createContext, useState } from 'react'

const ModalGlobalContext = createContext()
const ModalContextProvider = ({children}) => {
    const [modal, setModal] = useState(false)
    const [modalOk, setModalOk] = useState(false)
    const [modalTitle, setModalTitle] = useState(false)
    const [modalText, setModalText] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [entityId, setEntityId] = useState("")
    
    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <ModalGlobalContext.Provider value={{
            modal,
            toggleModal,
            modalOk, setModalOk,
            modalTitle, setModalTitle,
            modalText, setModalText,
            modalError, setModalError,
            entityId, setEntityId
            }}>
            {children}
        </ModalGlobalContext.Provider>
    )
}

/*cremos un custom Hook para utilizar el contexto */
export const useModalContext = () => useContext(ModalGlobalContext)

export default ModalContextProvider