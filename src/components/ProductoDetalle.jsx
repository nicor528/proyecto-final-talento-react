import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import Producto from "./BotonCompra";
import { Button } from "react-bootstrap";

function ProductoDetalle({}) {

  const navegar = useNavigate();

  const {admin} = useAuthContext();
  const {agregarAlCarrito} = useContext(CarritoContext);
  const {productoEncontrado, obtenerProducto, eliminarProducto} = useProductosContext();

  const { id } = useParams();
  //const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id).then(() => {
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


  function funcionCarrito() {
    if (cantidad < 1) return;

    console.log("Agregar al carrito")
    agregarAlCarrito({ ...productoEncontrado, cantidad });
    dispararSweetBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
  }

  function dispararEliminar(){
    eliminarProducto(id).then(() => {
      navegar("/productos")
    }).catch((error) => {
      dispararSweetBasico("Hubo un problema al agregar el producto", error, "error", "Cerrar")
    })
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <div className="detalle-container">
      <img className="detalle-imagen" src={productoEncontrado.imagen} alt={productoEncontradonombre} />
      <div className="detalle-info">
        <h2>{productoEncontradonombre}</h2>
        <p>{productoEncontrado.descripcion}</p>
        <p>{productoEncontradoprecio} $</p>
        <div className="detalle-contador">
          <button onClick={restarContador}>-</button>
          <span>{cantidad}</span>
          <button onClick={sumarContador}>+</button>
        </div>
        {admin ? <Link to={"/admin/editarProducto/" + id}> <Button >Editar Producto</Button></Link> : <Button onClick={funcionCarrito}>Agregar al carrito</Button> }
        {admin ? <button onClick={dispararEliminar} >Eliminar Producto</button> : <></>}
      </div>
    </div>
  );
}

export default ProductoDetalle;
