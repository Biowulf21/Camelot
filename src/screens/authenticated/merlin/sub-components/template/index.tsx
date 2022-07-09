import React, { SetStateAction, useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormGroup, InputGroup, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Template } from '../../../../../services/Template-Service/template-service'
import '../template/styles.css'
import { DocumentData } from 'firebase/firestore'
import TemplateViewer from './sub-components/view-templates'


const TemplateComponent = () => {
    var templateObj = new Template();
    const [templateList, setTemplateList] = useState<DocumentData[]>([]);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [currentSubject, setCurrentSubject] = useState('');
    const [currentBody, setcurrentBody] = useState('')
    const [currentID, setCurrentID] = useState('');
    
    const fetchTemplates = async () =>{
    setisLoading(true)
    const fetchedTemplates = await templateObj.getTemplates()
    setisLoading(false)
    setTemplateList(fetchedTemplates)
    console.log(templateList)
    }


    const handleViewTemplate = (id:DocumentData, subject:DocumentData, body:DocumentData) =>{
        console.log(id, subject, body);
        const newID = String(id);
        const newSubject = String(subject);
        const newBody = String(body);
        setCurrentID(newID);
        setCurrentSubject(newSubject);
        setcurrentBody(newBody);
    }

    useEffect(() => {
    fetchTemplates()
    }, [])
    
    if (isLoading){
        return (<h1>Loading</h1>)
    }

  return (
    <Container>
       <Col className='template-div mt-3 p-3'>
            <Row>
                <Col className='col-md-3 mx-2 px-0 view-template-card'>
                <ListGroup>
               {templateList.length > 0?
               templateList.map((template)=>{
                   return(
                     <ListGroupItem className='template-titlecard' onClick={() => handleViewTemplate(template.id, template.subject, template.body)} key={template.id}><b>{template.title}</b></ListGroupItem>
                );
               }) : <h1>Templates Empty</h1>}
               </ListGroup>
            </Col>
            <Col className='template-viewer mx-1 py-3'>
                <TemplateViewer id={currentID} subject={currentSubject} body={currentBody}></TemplateViewer>
            </Col>
            </Row>
       </Col>
       <Button onClick={fetchTemplates}>PRINT</Button>
    </Container>
  )
}

export default TemplateComponent