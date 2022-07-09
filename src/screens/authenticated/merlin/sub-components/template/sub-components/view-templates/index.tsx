import React from 'react'
import { Container } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import './styles.css'


interface TemplateViewerInterface{
    id:string;
    subject:string
    body: string
}

const TemplateViewer = (props:TemplateViewerInterface) => {
    const {id, subject, body} = props;

    const parsedBody = window.atob(body)
  return (
    <Container>
        <b className='template-subject'>Subject: {subject}</b>
        <div className='spacer'></div>
        <ReactMarkdown>{parsedBody}</ReactMarkdown>
      </Container>
  )
}

export default TemplateViewer