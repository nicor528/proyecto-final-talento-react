import "../styles/Carrito.css"

function CarritoCard({producto, funcionDisparadora}){
    
    function borrarDelCarrito() {
        console.log("Paso 1")
        funcionDisparadora(producto.id)
    }

    return(
        <div className="carrito-card" >
            <h3 className="carrito-producto" style={{color:"black"}}>{productonombre}</h3>
            {<p className="descripcion-carrito" style={{color:"black"}}>{producto.descripcion}</p>}
            <img className="carrito-image" src={producto.imagen}></img>
            <span style={{color:"black"}}>{producto.cantidad}</span>
            <div className="carrito-unitario">
                <span style={{color:"black"}}>{producto.precio} $</span>
            </div>
            <div className="carrito-sub">
                <span style={{color:"black"}}>{producto.cantidad * producto.precio} $</span>
            </div>
            <button className="boton-carrito" onClick={borrarDelCarrito} style={{backgroundColor: "red" ,color:"black"}}>X</button>
        </div>
    )
}

export default CarritoCard