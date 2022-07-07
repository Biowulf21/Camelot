import React, { SetStateAction, useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const MarkdownComponent = (props:any ) => {
    const {emailText, setEmailText} = props

    const handleEmailBodyText = (value:SetStateAction<string>) =>{
        setEmailText(value);
    }

  return (
        <Row className='no-gutter'>
            <Col className='my-3 markdown-textarea'>
                <FormGroup>
                    <Form.Label>Email Body</Form.Label>
                    <Form.Control onChange={(event)=>handleEmailBodyText(event.target.value)}  style={{height:'500px'}}  as='textarea'></Form.Control>
                </FormGroup>
            </Col>
            <Col className='markdown-textarea'>
            <FormGroup>
                    <Form.Label>Preview Body</Form.Label>
                    {/* TODO: use React Markdown To display Items. Link: https://github.com/remarkjs/react-markdown */}
                <Container>
                    <div className='px-3 py-3 my-5 markdown-preview container' style={{height:'500px', backgroundColor:'beige', maxWidth:"612px"}}>
                        <ReactMarkdown className='markdown'>{emailText}</ReactMarkdown>
                    </div>
                </Container>
                </FormGroup>
            </Col>
        </Row>
  )
}

export default MarkdownComponent