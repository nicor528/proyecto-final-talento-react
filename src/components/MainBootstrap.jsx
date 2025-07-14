import { Container, Row, Col, Image } from "react-bootstrap";



function MainBootstrap() {
  const nombre = import.meta.env.VITE_NOMBRE_APP
  return (
    <Container className="my-4">
      <Row className="align-items-center">
        <Col xs={12} md={4} lg={4}>
          <Image
            src="https://www.uship.com/learn/ca/wp-content/uploads/sites/3/thumbnail-placeholder-300x200-300x200.png"
            alt="Imagen ilustrativa"
            fluid
            rounded
          />
        </Col>
        <Col xs={12} md={8} lg={8}>
          <h2>Contenido Principal Actualizado de {nombre}</h2>
          <p>
            Este es un ejemplo de contenido dentro del área principal.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default MainBootstrap;
