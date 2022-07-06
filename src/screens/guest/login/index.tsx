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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [passIsVisible, setPassVisibility ] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const passwordChanged = (newPass: React.SetStateAction<string>) =>{
    setPassword(newPass);
  }

  const authentication = getAuth()
  const logIn = () => {
    signInWithEmailAndPassword(authentication, email, password).then((response)=>console.log(response))
  }

  const emailChanged = (newemail: React.SetStateAction<string>) => {
    setEmail(newemail);
  }

  const toggleVisibility = () =>{
    setPassVisibility(!passIsVisible);
  }
  return (
    <Container >
      <h1>CAMELOT - CRUSADER YEARBOOK TOOL HUB</h1>
      <Col>
        <Form>
          <InputGroup>
            <Form.Control onChange={(event)=>emailChanged(event.target.value)} type='email' placeholder='Enter your email' style={{marginBottom: "10px"}}></Form.Control>
          </InputGroup>

          <InputGroup className="mb-2">
              <Form.Control
              onChange={(event)=> passwordChanged(event.target.value)}
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
          <Button variant="primary" className="btn-primary" onClick={logIn}>Login</Button>
          <Col>
          </Col>
        </Form>
      </Col>
    </Container>
  )
}

export default Login