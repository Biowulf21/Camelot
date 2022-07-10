import React from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import "./styles.css";
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useState } from 'react';

const NewTemplate = () => {
    const [templateBodyText, setTemplateBodyText] = useState("");

    const handleEditTemplateBody = (value:string) =>{
        setTemplateBodyText(oldValue => value);
    }
  return (
    <Container fluid>
        <Row className='mx-2 my-2'>
            <Col className='col-md-6'>
                <InputGroup>
                    <InputGroup.Text className='col-md-3 col-sm-3 col-xs-auto'>Template Title</InputGroup.Text>
                    <Form.Control placeholder="Enter Your New Template's Title"></Form.Control>
                </InputGroup>
            </Col>
        </Row>
        <Row className='mx-2 my-2'>
            <Col className='col-md-6'>
                    <InputGroup>
                        <InputGroup.Text className='col-md-3 col-sm-3 col-xs-auto'>Template Subject</InputGroup.Text>
                        <Form.Control placeholder="Enter Your New Template's Title"></Form.Control>
                    </InputGroup>
                </Col>
        </Row>
        <Row className='editor-div mx-2 mb-2 justify-content-center'>
            <Col className='markdown-editor col-md-6 col-sm-3 col-xs-12 px-0'>
                <Form.Control onChange={(event) => handleEditTemplateBody(event.target.value)} className='editor-textarea mx-0' as='textarea'>oten</Form.Control>
            </Col>
            <Col className='markdown-viewer col-md-6 col-sm-9 p-2'>
                <ReactMarkdown>{templateBodyText}</ReactMarkdown>
            </Col>
        </Row>
            <div className='save-div mx-2 my-0'>
                <Button variant='secondary'>Cancel</Button>
                <Button style={{maxWidth:"200px"}} className='mx-2'>Save</Button>
            </div>
    </Container>
  )
}

export default NewTemplate