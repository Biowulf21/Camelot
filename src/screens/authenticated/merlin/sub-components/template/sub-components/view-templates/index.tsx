import React, { useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import './styles.css';
import TemplateBodyViewer from './sub-components/template-body-viewer';
import TemplateCard from './sub-components/template-card';

const TemplateViewer = () => {
  const [emailTitle, setemailTitle] = useState('TitleaLKASDJFKOLAHJ DLFJKA HKSDJAKSD');
  const [emailSubject, setemailSubject] = useState('Subject');
  const [emailBody, setEmailBody] = useState('Dear __Geb__,  I am James Patrick B Jilhaney and I love dick.');

  return (
    <Container>
      <Row className='template-viewer mt-3'>
        <Col className='col-md-3 pt-1 template-viewer-title'>
          <ListGroup>
            <TemplateCard title={emailTitle} subject={emailSubject} body={emailBody}></TemplateCard> 
          </ListGroup>
        </Col>
        <Col className=''>
          <TemplateBodyViewer body={emailBody}></TemplateBodyViewer>
        </Col>
      </Row>
    </Container>
  )
}

export default TemplateViewer