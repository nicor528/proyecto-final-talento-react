import React, { useState } from 'react';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { agregarProducto } from '../assets/requests';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function FormularioProductoFirebase({}) {

  const {admin} = useAuthContext();

  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: ""
  });

  const validarFormulario = () => {
    if (!productonombre.trim()) {
      return("El nombre es obligatorio.")
    }
    if (!producto.precio || producto.precio <= 0) {
      return("El precio debe ser mayor a 0.")
    }
    console.log(producto.descripcion.trim())
    if (!producto.descripcion.trim() || producto.descripcion.length < 10) {
      return("La descripción debe tener al menos 10 caracteres.")
    }
    if(!producto.imagen.trim()){
      return("La url de la imgaen no debe estar vacía")
    }
    else{
      return true
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const validarForm = validarFormulario()
    if (validarForm == true) {
      agregarProducto(producto).then((data) => {
        setProducto({ name: '', price: '', description: '', imagen: ""});
      }).catch((error) => {
        dispararSweetBasico("Hubo un problema al agregar el producto", error, "error", "Cerrar")
      })
    } else{
      dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar")
    }
  }

  if(!admin){
    return(
      <Navigate to="/login" replace/>
    )
  }

  return ( 
    <form onSubmit={handleSubmit2}>
      <h2>Agregar Producto</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text" name="nombre" value={productonombre} onChange={handleChange} required/>
      </div>
      <div>
        <label>URL de la Imagen</label>
        <input
          type="text" name="imagen" value={producto.imagen} onChange={handleChange} required/>
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" name="precio" value={producto.precio} onChange={handleChange} required
          min="0"/>
      </div>
       <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default FormularioProductoFirebase;
  