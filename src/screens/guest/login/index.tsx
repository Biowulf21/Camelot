import React from 'react'
import { Col, Container, Form, FormLabel, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import "./styles.css"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  const [passIsVisible, setPassVisibility ] = useState(false);

  const toggleVisibility = () =>{
    setPassVisibility(!passIsVisible);
  }
  return (
    <Container >
      <h1>CAMELOT - CRUSADER YEARBOOK TOOL HUB</h1>
      <Col>
        <Form>
          <InputGroup>
            <Form.Control type='email' placeholder='Enter your email' style={{marginBottom: "10px"}}></Form.Control>
          </InputGroup>

          <InputGroup className="mb-2">
              <Form.Control
              type={passIsVisible? "text" : "password"}
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon2"
              />
              <Button onClick={toggleVisibility} variant="outline-primary" id="button-addon2"><FontAwesomeIcon icon={passIsVisible ? faEye : faEyeSlash}></FontAwesomeIcon></Button>
          </InputGroup>
          <Col>
          <a className='mb-2' href="https://gmail.com/">Forgot Password</a>
          </Col>
          <Button type='submit' variant="primary" className="btn-primary">Login</Button>
          <Col>
          </Col>
        </Form>
      </Col>
    </Container>
  )
}

export default Login