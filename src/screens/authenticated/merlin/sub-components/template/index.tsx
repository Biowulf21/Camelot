import React, { SetStateAction, useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormGroup, InputGroup, Row } from 'react-bootstrap'
import MarkdownComponent from './sub-components/markdown-component'
import { Template } from '../../../../../services/Template-Service/template-service'

const TemplateComponent = () => {
    const [templateTitle, setTemplateTitle] = useState('');
    const [templateSubject, settemplateSubject] = useState('');
    const [templateBody, setTemplateBody] = useState('');

    var templateObj = new Template();

    const currentTemplateObject = {
        title: templateTitle,
        subject: templateSubject,
        body: templateBody
    }

    const handleChangeTemplateTitle = (value:SetStateAction<string>) =>{
        setTemplateTitle(value)
    }

    const handleChangeTemplateSubject = (value:SetStateAction<string>) => {
        settemplateSubject(value)
    }
    
    const printTemplates = () =>{
       templateObj.getTemplates()
    }

    const saveTemplate = () =>{
        templateObj.saveTemplate(currentTemplateObject)
    }

  return (
    <Container>
        <Row>
            <Row>
            <Col>
            <FormGroup className='mb-3 col-md-5' >
                <Form.Label className="mt-3"><h2>{templateTitle ? templateTitle : 'Template Title'}</h2></Form.Label> 
                <InputGroup>
                <InputGroup.Text>Template Title</InputGroup.Text>
                <Form.Control onChange={(event)=>handleChangeTemplateTitle(event.target.value)}></Form.Control>
                </InputGroup>
            </FormGroup>

            <FormGroup className='mb-3 col-md-5'>
                <InputGroup>
                <InputGroup.Text>Template Subject</InputGroup.Text>
                <Form.Control onChange={(event)=> {handleChangeTemplateSubject(event.target.value)}}></Form.Control>
            </InputGroup>
            </FormGroup>
            
            </Col>
            </Row>
        <Col className='my-2' style={{backgroundColor: 'light-gr'}}>
            <MarkdownComponent emailText={templateBody}  setEmailText={setTemplateBody}></MarkdownComponent>
        </Col>
        <Button onClick={saveTemplate} className='mb-3'>Save</Button>
        <Button onClick={printTemplates}>PRINT TEMPLATES</Button>
        </Row>
    </Container>
  )
}

export default TemplateComponent