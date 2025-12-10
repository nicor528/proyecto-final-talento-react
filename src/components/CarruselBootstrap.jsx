import { useProductosContext } from "../contexts/ProductosContext";
import { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";

function CarruselBootstrap() {
    const { productos, obtenerProductos } = useProductosContext();
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (productos.length === 0) {
            obtenerProductos().then(() => setCargando(false));
        } else {
            setCargando(false);
        }
    }, []);

    const primerosTres = productos.slice(0, 3);
    console.log(primerosTres)

    if (cargando) return <p>Cargando carrusel...</p>;
    if (primerosTres.length === 0) return <p>No hay productos para mostrar.</p>;

    return (
        <Container className="my-4">
            <Carousel>
                {primerosTres.map((producto) => (
                <Carousel.Item key={producto.id}>
                    <img
                    className="d-block w-100"
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{ height: "400px", objectFit: "cover" }}
                    />
                    <Carousel.Caption>
                    <h3>{producto.nombre}</h3>
                    <p>{producto.descripcion}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
}

export default CarruselBootstrap;
