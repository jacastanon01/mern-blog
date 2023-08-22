import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import React from "react";

function FormContainer({ children }) {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6} className="card p-3">
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
