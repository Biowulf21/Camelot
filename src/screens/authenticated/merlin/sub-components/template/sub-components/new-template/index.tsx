import React from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import "./styles.css";
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Template } from '../../../../../../../services/Template-Service/template-service';
import LoadingComponent from '../../../../../../global-components/loading-component';
import { useNavigate } from 'react-router-dom';

const NewTemplate = () => {
    const templateObject = new Template()
    const navigate = useNavigate()
    const [templateTitle, setTemplateTitle] = useState<string>("");
    const [templateSubject, setTemplateSubject] = useState<string>("");
    const [templateBodyText, setTemplateBodyText] = useState<string>("");
    const [hasSaved, setHasSaved] = useState<boolean>(false);
    const [isLoading, setisLoading] =useState<boolean>(false)

    const handleEditTemplateTitle = (value:string) =>{
        setTemplateTitle(oldValue => value);
    }
    const handleEditTemplateSubject = (value:string) =>{
        setTemplateSubject(oldValue => value);
    }
    const handleEditTemplateBody = (value:string) =>{
        setTemplateBodyText(oldValue => value);
    }

    const handleSaveNewTemplate = async () =>{
        console.log(templateTitle, templateSubject, templateBodyText)
        if (templateTitle === "" || templateSubject ==="" || templateBodyText===""){
            Swal.fire(
                'Fields Empty',
                'One or more fields are empty. Make sure they all have contents.',
                'error'
              )
        }
        else{
            console.log('success')
            setisLoading(true)
            const hasSaved: boolean | void = await templateObject.saveNewTemplate(templateTitle, templateSubject, templateBodyText).then(()=>{
                setisLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Your Template has been saved',
                    showConfirmButton: true,
                    timer: 3000
                  }).then((okResult)=>{
                      navigate('/merlin')

                  })
                  setTemplateBodyText('')
            })
            
        }

    }
    if (isLoading)return(<LoadingComponent></LoadingComponent>)

  return (
    <Container fluid>
        <Row className='mx-2 my-2'>
            <Col className='col-md-6'>
                <InputGroup>
                    <InputGroup.Text className='col-md-3 col-sm-3 col-xs-auto'>Template Title</InputGroup.Text>
                    <Form.Control onChange={(event) => handleEditTemplateTitle(event.target.value)} placeholder="Enter Your New Template's Title"></Form.Control>
                </InputGroup>
            </Col>
        </Row>
        <Row className='mx-2 my-2'>
            <Col className='col-md-6'>
                    <InputGroup>
                        <InputGroup.Text className='col-md-3 col-sm-3 col-xs-auto'>Template Subject</InputGroup.Text>
                        <Form.Control onChange={(event) => handleEditTemplateSubject(event.target.value)} placeholder="Enter Your New Template's Subject"></Form.Control>
                    </InputGroup>
                </Col>
        </Row>
        <Row className='editor-div mx-2 mb-2 justify-content-center'>
            <Col className='markdown-editor col-md-6 col-sm-3 col-xs-12 px-0'>
                <Form.Control onChange={(event) => handleEditTemplateBody(event.target.value)} className='editor-textarea mx-0' as='textarea'></Form.Control>
            </Col>
            <Col className='markdown-viewer col-md-6 col-sm-9 p-2'>
                <ReactMarkdown>{templateBodyText}</ReactMarkdown>
            </Col>
        </Row>
            <div className='save-div mx-2 my-0'>
                <div>
                    <a className='cheatsheet-link' target={"_blank"} href='https://www.markdownguide.org/cheat-sheet/'>Formatting Cheatsheet</a>
                </div>
                <div>
                <Button onClick={()=> navigate('/merlin')} variant='secondary'>Cancel</Button>
                <Button onClick={handleSaveNewTemplate} style={{maxWidth:"200px"}} className='mx-2'>Save</Button>
                </div>
            </div>
    </Container>
  )
}


export default NewTemplate