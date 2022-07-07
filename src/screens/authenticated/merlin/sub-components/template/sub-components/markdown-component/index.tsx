import React, { SetStateAction, useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const MarkdownComponent = () => {
//     const [emailBodyText, setEmailBodyText] = useState('');

    // const handleEmailBodyText = (value:SetStateAction<string>) =>{
    //     setEmailBodyText(value);
    // }

    const emailBodyText = '#Hello World'

  return (
    <Container>
        <Row className='no-gutter'>
            <Col className='my-3 markdown-textarea'>
                <FormGroup>
                    <Form.Label>Email Body</Form.Label>
                    <Form.Control  style={{height:'500px'}}  as='textarea'></Form.Control>
                </FormGroup>
            </Col>
            <Col className='my-3 markdown-textarea'>
            <FormGroup>
                    <Form.Label>Preview Body</Form.Label>
                    {/* TODO: use React Markdown To display Items. Link: https://github.com/remarkjs/react-markdown */}
                    <div style={{height:'500px', backgroundColor:'beige'}}>
                        <ReactMarkdown>{emailBodyText}</ReactMarkdown>
                    </div>
                </FormGroup>
            </Col>
        </Row>
    </Container>
  )
}

export default MarkdownComponent