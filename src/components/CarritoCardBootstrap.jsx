import { Card, Row, Col, Button } from "react-bootstrap";

function CarritoCardBootstrap({ producto, funcionDisparadora }) {
    function borrarDelCarrito() {
        funcionDisparadora(producto.id);
    }

    return (
        <Card className="mb-3">
        <Card.Body>
            <Row className="align-items-center">
            <Col md={3}>
                <Card.Img
                variant="top"
                src={producto.imagen}
                style={{ maxHeight: "100px", objectFit: "cover", width: "100%" }}
                />
            </Col>
            <Col md={2}>
                <Card.Title>{productonombre}</Card.Title>
                <Card.Text className="text-muted">{producto.descripcion}</Card.Text>
            </Col>
            <Col md={1}>
                <span>Cant: {producto.cantidad}</span>
            </Col>
            <Col md={2}>
                <span>Precio: {producto.precio} $</span>
            </Col>
            <Col md={2}>
                <span>Subtotal: {producto.cantidad * producto.precio} $</span>
            </Col>
            <Col md={2}>
                <Button variant="danger" onClick={borrarDelCarrito}>
                X
                </Button>
            </Col>
            </Row>
        </Card.Body>
        </Card>
    );
}

export default CarritoCardBootstrap;
