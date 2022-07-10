import React, { SetStateAction, useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormGroup, InputGroup, ListGroup, ListGroupItem, Row, Spinner } from 'react-bootstrap'
import { Template } from '../../../../../services/Template-Service/template-service'
import '../template/styles.css'
import { DocumentData } from 'firebase/firestore'
import TemplateViewer from './sub-components/view-templates'
import Swal from 'sweetalert2'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faNavicon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'


const TemplateComponent = () => {
    var templateObj = new Template();
    const navigate = useNavigate()
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

    const handleDeleteTemplate = (editID:string) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'The template has been deleted.',
            'success'
          )
        }
      })
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
      const token = sessionStorage.getItem('Auth_Token')
      if (!token){
        navigate('/')
      }
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
        <Col className='d-flex align-items-end justify-content-end text-center mt-2'>
      <Button disabled={currentID === "" ? true : false} variant='danger' className='mx-1' onClick={() => handleDeleteTemplate(currentID)}>Delete</Button>
      <Button disabled={currentID === "" ? true : false} variant='success' className='mx-1' onClick={() => handleEditTemplate(currentID)}>Edit</Button>
      <Button className='mx-1'>New <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
        </Col>
      </Row>
       <Col className='template-div mt-2 p-3 mx-5'>
            <Row>
                <Col xs={{ span: 12, order: 1 }} md={{ span: 2, order: 1 }}  className='view-template-card px-0'>
                <ListGroup>
               {templateList.length > 0?
               templateList.map((template)=>{
                   return(
                     <ListGroupItem className='template-titlecard' onClick={() => handleViewTemplate(template.id, template.subject, template.body)} key={template.id}><b>{template.title}</b></ListGroupItem>
                );
               }) : <h1>Templates Empty</h1>}
               </ListGroup>
            </Col>
            <Col xs={{ span: 12, order: 2 }} md={{ span: 10, order: 2 }} className='template-viewer'>
                <TemplateViewer id={currentID} subject={currentSubject} body={currentBody}></TemplateViewer>
            </Col>
            </Row>                
       </Col>
    </Container>
  )
}

export default TemplateComponent