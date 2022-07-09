import React, { SetStateAction, useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormGroup, InputGroup, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import MarkdownComponent from './sub-components/markdown-component'
import { Template } from '../../../../../services/Template-Service/template-service'
import '../template/styles.css'
import { collection, DocumentData, getDocs, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../../../../services/firebase-config'
import TEMPLATE_PATH from '../../../../../services/firebase-constants'

const TemplateComponent = () => {
    var templateObj = new Template();
    const [templateList, setTemplateList] = useState<DocumentData[]>([]);
    const [isLoading, setisLoading] = useState<boolean>(false);
    
    const fetchTemplates = async () =>{
    const fetchedTemplates = await templateObj.getTemplates()
    setTemplateList(fetchedTemplates)
    console.log(templateList)
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
            <Col className='col-md-3 view-template-card'>
                <ListGroup>
               {templateList.length > 0?
               templateList.map((template)=>{
                   return(
                     <ListGroupItem className='template-titlecard' onClick={() => console.log(template.id)} key={template.id}><b>{template.title}</b></ListGroupItem>
                );
               }) : <h1>Templates Empty</h1>}
               </ListGroup>
            </Col>
       </Col> 
       <Button onClick={fetchTemplates}>PRINT</Button>
    </Container>
  )
}

export default TemplateComponent