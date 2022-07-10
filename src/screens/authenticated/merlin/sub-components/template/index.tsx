import React, { SetStateAction, useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormGroup, InputGroup, ListGroup, ListGroupItem, Row, Spinner } from 'react-bootstrap'
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

    const handleEditTemplate = (editID:string) => {
      console.log(editID)
    }

    const handleViewTemplate = (id:DocumentData, subject:DocumentData, body:DocumentData) =>{
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
        return (
          <Container>
            <div className="d-flex align-items-center justify-content-center text-center my-5">
              <div className='loading-text-div mx-2'>
                  <h1>Loading</h1>
              </div>
              <div className='spinner-div'>
                  <Spinner animation='border'></Spinner>
              </div>
            </div>
          </Container>
        )
    }

  return (
    <Container fluid>
      <Row>
        <Col className='mt-2 mx-5 edit-div'>
      <Button disabled={currentID === "" ? true : false} variant='success' className='' onClick={() => handleEditTemplate(currentID)}>Edit</Button>
        </Col>
      </Row>
       <Col className='template-div mt-2 p-3 mx-5'>
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
            <Col className='template-viewer mx-2 py-1'>
                <TemplateViewer id={currentID} subject={currentSubject} body={currentBody}></TemplateViewer>
            </Col>
            </Row>                
       </Col>
    </Container>
  )
}

export default TemplateComponent