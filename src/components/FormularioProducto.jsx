import React, { useState } from 'react';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useProductosContext } from '../contexts/ProductosContext';

function FormularioProducto({}) {
  const {agregarProducto} = useProductosContext();
  const {admin} = useAuthContext();

  const [producto, setProducto] = useState({
    name: '',
    precio: '',
    descripcion: '',
    imagen: ""
  });

  const validarFormulario = () => {
    if (!producto.nombre.trim()) {
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
        setProducto({ name: '', precio: '', descripcion: '', imagen: ""});
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
    <div className='d-flex flex-column  justify-content-center  align-items-center'>
      <form onSubmit={handleSubmit2} className="p-4 border rounded shadow w-100">
        <h3>Editar Producto</h3>
        <div>
          <label className="form-label">Nombre:</label>
          <input
            className="form-control"
            type="text"
            name="nombre"
            value={producto.nombre || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="form-label">Imagen URL:</label>
          <input
            type="text" className="form-control" name="imagen" value={producto.imagen} onChange={handleChange} required/>
        </div>
        <div>
          <label className="form-label">Precio:</label>
          <input
            type="number"
            name="precio"
            value={producto.precio || ''}
            onChange={handleChange}
            required
            className="form-control"
            min="0"
          />
        </div>
        <div>
          <label className="form-label">Descripcion:</label>
          <textarea
            name="descripcion"
            value={producto.descripcion || ''}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
}

export default FormularioProducto;
  