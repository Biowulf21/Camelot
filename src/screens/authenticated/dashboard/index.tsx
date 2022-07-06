import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { getAuth, signOut } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from "../dashboard/sub-components/navbar/index";


const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem('Auth_Token')
    if (!token){
      navigate('/')
    }
  }, []);
  
  return (
  <Container>
    <Col>
    <div className="card-dash col-md-12 h-100" style={{backgroundColor:"gray"}}>

    </div>
    </Col>
  </Container>  
  )
}

export default Dashboard