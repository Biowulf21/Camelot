import React from 'react'
import { Container, ListGroup } from 'react-bootstrap';
import './styles.css'

interface TemplateCardInterface {
    title:string;
    subject:string;
    body:string;
}
const TemplateCard = (props:TemplateCardInterface) => {
    const {title, subject, body} = props;
    
  return (
   <ListGroup.Item>
    <div className='title-text'>TITLE: {title}</div>
    <div className='subject-text my-1'>SUBJECT: {subject}</div>
   </ListGroup.Item> 
  )
}

export default TemplateCard