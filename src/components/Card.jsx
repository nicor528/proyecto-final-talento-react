import { useState } from "react";
import "../styles/Productos.css"
import { dispararSweetBasico } from "../assets/SweetAlert";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardProducto({producto}){
    console.log(producto)

    return(
        <Card>
            <Card.Img variant="top" src={producto.imagen} style={{ maxHeight: "200px", objectFit: "cover" }} />
            <Card.Body>
              <Card.Title>{producto.nombre}</Card.Title>
                <Link to={"/productos/" + producto.id}><Button variant="primary">Ver detalles del producto</Button></Link>
            </Card.Body>
          </Card>
        
    )
}

export default CardProducto