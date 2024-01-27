import React from 'react'
import { buttonStyle, contactStyle, indexStyle } from '../styles'
import { Link } from 'react-router-dom'

import { RiErrorWarningLine } from "react-icons/ri";
import { ROOT } from '../apiConfig';

const Contact = () => {
  return (
      <main className={contactStyle.contactContainer}>
        <div className={contactStyle.contactFormContainer}>
              <form action="Post">
                  <div>
                      <label>Nombre completo</label>
                      <span className={indexStyle.warningContainer}>
                        <input name="full-name" type="text" required/>
                        <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                      </span>
                      <label>Email</label>
                      <span className={indexStyle.warningContainer}>
                        <input name="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required/>
                        <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                      </span>
                      <label>Asunto</label>
                      <span className={indexStyle.warningContainer}>
                        <input name="subject" type="text" required/>
                        <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                      </span>
                      <label>Mensaje</label>
                      <span className={indexStyle.warningContainer}>
                        <textarea name="message" id="" cols="30" rows="10" required></textarea>
                        <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                      </span>
                  </div>
                  <div>
                      <Link to={`${ROOT}/success`} className={buttonStyle.btnPrimary}>Enviar</Link>
                  </div>
              </form>
        </div>
      </main>    
  )
}

export default Contact