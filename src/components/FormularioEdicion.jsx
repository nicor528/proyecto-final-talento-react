import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

function FormularioEdicion({ }) {
  const {admin} = useAuthContext();
  const {obtenerProducto, productoEncontrado, editarProducto} = useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState(productoEncontrado);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  if(!admin){
    return(
      <Navigate to="/login" replace/>
    )
  }

  useEffect(() => {
    obtenerProducto(id).then(() => {
      //setProducto(productoEncontrado)
      setCargando(false);
    }).catch((error) => {
      if(error == "Producto no encontrado"){
        setError("Producto no encontrado")
      }
      if(error == "Hubo un error al obtener el producto."){
        setError("Hubo un error al obtener el producto.");
      }
      setCargando(false);
    })
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario()
    if(validarForm == true){
      editarProducto(producto).then((prod) => {
        toast.success("Producto editado correctamente!");
      }).catch((error) => {
        toast.error("Hubo un problema al actualizar el producto. " + error.message);
      })
    }else{
      dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar")
    }

  };

  return (
    <div className='d-flex flex-column  justify-content-center  align-items-center min-vh-100'>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow ">
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
        <ToastContainer />
      </form>
    </div>
  );
}

export default FormularioEdicion
