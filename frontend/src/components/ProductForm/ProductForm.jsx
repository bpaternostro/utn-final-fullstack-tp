import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContextProvider'

import { adminStyle, indexStyle, buttonStyle} from '../../styles'
import { API_ENDPOINTS, IMAGE_LOCATION, ROOT } from '../../apiConfig';

import { RiErrorWarningLine } from "react-icons/ri";

const ProductForm = ({ id }) => {
  const initialValues = {
    name: "",
    category: "",
    brand: "",
    price: "",
    description: "",
    currency: "",
    stock: 0,
    img: {
        src: "",
        alt: ""
    },
    colors: []
  }
  const initAvailableColors = [ 
    {color: "#737CA1", colorName: "Slate Blue Grey", checked:false},
    {color: "#36454F", colorName: "Charcoal Blue", checked:false},
    {color:"#7DFDFE",colorName:"Tron Blue", checked:false},
    {color:"#000", colorName:"Negro", checked:false},
    {color:"#3B9C9C",colorName:"Deep-Sea", checked:false}
  ]
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [msg, setMsg] = useState('')
  const [actualColors, setActualColors] = useState([])
  const [file, setFile] = useState(null);
  const [fileInformation, setFileInformation] = useState(null);
  const {setProductsHasChanged} = useGlobalContext()
  const [alt, setAlt] = useState("");
  const [availableColors, setAvailableColors] = useState(initAvailableColors)

  const [formValues, setFormValues] = useState(initialValues)
  

  const handleChangeInput = (value, name) => {
    if(name == "alt"){
      setAlt(value)
      return
    }
    const aux = {...formValues, [name]:value}
    setFormValues(aux)
  }
  
  const handleChangeColors = (e) => { 
    setAvailableColors(availableColors.map((c) => {
      if(c.color === e.target.name){
        c.checked = e.target.checked
      }
      return c
    }))
  }

  const handleChangeImage = (e) => {
    const formData = new FormData()
    formData.append('my-image-file', e.target.files[0], e.target.files[0].name)
    setFile(formData)
    setFileInformation(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(fileInformation){
      let image_location = `${IMAGE_LOCATION}/${fileInformation.name}`
      formValues.img = { src:image_location, alt: alt }
      axios.post(API_ENDPOINTS.uploadImage, file, {headers: {'Content-Type': 'multipart/form-data', 'Authorization': localStorage.getItem('auth-token-app')}})
      .then(res => {
        console.log('Axios response: ', res)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    if(alt){
      formValues.img.alt = alt
    }
    formValues.colors = availableColors.filter((c) => c.checked)
    fetch(`${API_ENDPOINTS.products}/${id}`, 
    {
      method: id ? "PUT": "POST",
      headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth-token-app')},
      body: JSON.stringify(formValues)
    })
    .then( resp => {
      setProductsHasChanged(true)
      navigate(`${ROOT}/admin`)
      return
    })
    .catch(error => {
      setErrorMsg(error)
      return
   })
  }

  useEffect(() => {
    if(id){
      axios.get(`${API_ENDPOINTS.products}/${id}`)
      .then(resp  => {
          setFormValues(resp.data.product)
          setAlt(resp.data.product.img.alt)
          let currentColors = resp.data.product.colors.map((c) => c.color)
          setAvailableColors(availableColors.map((c) => {
            return {color: c.color, colorName: c.colorName, checked: currentColors.includes(c.color) ? true: false}
          }))
      })
    }
  }, [])
  
  return (
    <div className={adminStyle.adminFormContainer}>
        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
            <div className={adminStyle.productFormContainer}>
              <span>
                <div>
                  <span className={adminStyle.productImageContainer}>
                    <span className={adminStyle.informationMessage}>{`${formValues.img.src}`}</span>
                    <img className={adminStyle.productImageDetail} src={`${API_ENDPOINTS.images}/${formValues.img.src}`} alt={formValues.img.alt} />
                    <input type="file" name="file" onChange={(e) => handleChangeImage(e)} accept="image/png, image/jpeg"/>
                    <span className={adminStyle.informationMessage}>Seleccionar Imagen (PNG, JPG)</span>
                  </span>
                  <span>
                    <input name="alt" type="text" onChange={(e) => handleChangeInput(e.target.value, e.target.name)} value={alt}/>
                  </span>
                  <span className={adminStyle.informationMessage}>Texto alternativo</span>
                  
                </div>
                <div className={adminStyle.colorContainer}>
                  <span><label>Colores</label></span>
                  <span>
                    { availableColors && availableColors.sort((a,b) => a.colorName - b.colorName).map((c, index) => <label className={adminStyle.colorsLabel} key={index}><input className={adminStyle.myCheckBox} key={index} onChange={(e) => handleChangeColors(e)}  name={`${c.color}`} type="checkbox" value={c.colorName} checked={ c.checked } /> {c.colorName} </label> ) }
                  </span>
                </div>
              </span>
              <span>
                <span>
                  <label>Nombre</label>
                  <span className={indexStyle.warningContainer}>
                    <input name="name" type="text" required value={formValues.name} onChange={(e) => handleChangeInput(e.target.value, e.target.name)} />
                    <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                  </span>
                </span>
                <span>
                  <span>
                    <label>Categoria</label>
                    <span className={indexStyle.warningContainer}>  
                      <input name="category" type="text" required value={formValues.category} onChange={(e) => handleChangeInput(e.target.value, e.target.name)}/>  
                      <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                    </span>  
                  </span>
                  <span>
                    <label>Marca</label>
                    <span className={indexStyle.warningContainer}>
                      <input name="brand" type="text" required onChange={(e) => handleChangeInput(e.target.value, e.target.name)} value={formValues.brand} />  
                      <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                    </span>
                  </span>
                </span>
                <span>
                  <span>
                    <label>Precio</label>
                    <span className={indexStyle.warningContainer}>
                      <input name="price" type="number" inputMode="decimal" step="any" min="1" required onChange={(e) => handleChangeInput(e.target.value, e.target.name)} value={formValues.price}/>
                      <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                    </span>
                  </span>
                  <span>
                    <label>Moneda</label>
                    <span className={indexStyle.warningContainer}>
                      <input name="currency" type="text" required onChange={(e) => handleChangeInput(e.target.value, e.target.name)} value={formValues.currency}/>
                      <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                    </span>
                  </span>
                  <span>
                    <label>Stock</label>
                    <span className={indexStyle.warningContainer}>
                      <input name="stock" type="number" min="0" required onChange={(e) => handleChangeInput(e.target.value, e.target.name)} value={formValues.stock}/>
                      <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                    </span>
                  </span>
                </span>
                <span>
                  <label>Descripción</label>
                  <span className={indexStyle.warningContainer}>
                    <textarea className={adminStyle.textarea} name="description" type="text" required onChange={(e) => handleChangeInput(e.target.value, e.target.name)} value={formValues.description}/>
                    <span className={indexStyle.warningButton}><RiErrorWarningLine/></span>
                  </span>
                </span>
                <span>
                   {
                    error && <span>{errorMsg}</span>
                   }
                </span>
                
              </span>
            </div>
            <div className={adminStyle.toolbar}>
                <button type='submit' className={buttonStyle.btnPrimary} onSubmit={() => handleSubmit(e)}>{id ? 'Guardar': 'Crear'}</button>
                <Link to={`${ROOT}/admin`} className={buttonStyle.btnPrimary}>Volver</Link>
            </div>
        </form>
    </div>
  )
}

export default ProductForm