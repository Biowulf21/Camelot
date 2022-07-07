import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './styles.css';

const TemplateViewer = () => {
  return (
    <Container>
      <Row className='template-viewer mt-3'>
        <Col className='col-md-3 template-viewer-title'>OTEN</Col>
        <Col className=''>OTEN2</Col>
      </Row>
    </Container>
  )
}

export default TemplateViewer