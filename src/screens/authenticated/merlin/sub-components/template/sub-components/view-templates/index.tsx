import React from 'react'
import { Button, Col, Container } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import './styles.css'


interface TemplateViewerInterface{
    id:string;
    subject:string
    body: string
}

const TemplateViewer = (props:TemplateViewerInterface) => {
    const {id, subject, body} = props;
    //Parses base64 into markdown in string format
    const parsedBody = window.atob(body)


  return (
    <Container>
        <b className='template-subject'>{subject}</b>
        <div className='spacer'></div>
        <ReactMarkdown>{parsedBody}</ReactMarkdown>
      </Container>
  )
}

export default TemplateViewer