import React from 'react'
import PageRouter from './router/PageRouter'
import { Navbar, Footer, Modal } from './components'

function App() {
  return (
    <> 
      <Navbar/>
        <PageRouter/>
      <Footer/>
    </>
  )
}

export default App
