import React, { useState } from 'react'
import { Button, Col, Container, Form, FormGroup, InputGroup, Row } from 'react-bootstrap'
import MarkdownComponent from './sub-components/markdown-component'

const Template = () => {
    const [emailBodyText, setEmailBodyText] = useState('');
    const [emailSubjectText, setEmailSubjectText] = useState('');

  return (
    <Container>
        <Row>
            <Row>
            <Col>
            <FormGroup className='mb-3 col-md-5' >
                <Form.Label className="mt-3">Upload a mailing list</Form.Label> 
                <Form.Control className="mb-1" type="file" accept='.csv' />
                <Form.Text > Please only upload a .csv formatted client mailing list.</Form.Text>
            </FormGroup>
                <InputGroup className='mb-3'>
                <InputGroup.Text>Subject</InputGroup.Text>
            <Form.Control></Form.Control>
            </InputGroup>
            </Col>
            </Row>
        <Col className='my-2' style={{backgroundColor: 'light-gr'}}>
            <MarkdownComponent emailText={emailBodyText}  setEmailText={setEmailBodyText}></MarkdownComponent>
        </Col>
        <Button className='mb-3'>Save</Button>
        </Row>
    </Container>
  )
}

export default Template