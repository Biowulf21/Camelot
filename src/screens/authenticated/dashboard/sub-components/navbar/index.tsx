import * as React from 'react';
import { Alert, Button, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNavicon } from '@fortawesome/free-solid-svg-icons';
import { getAuth, signOut } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';


const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleSignOut = () =>{
    const auth = getAuth()
    signOut(auth)
    sessionStorage.clear()
    console.log('Deleted token')
    console.log('Redirecting to login page')
    navigate('/')
  }
  return (
    <>
    { location.pathname === "/" ? null :
    <Navbar>
      <Navbar.Offcanvas show={show} onClick={handleShow} onHide={handleClose }>
      <Offcanvas.Header closeButton>
          <Offcanvas.Title>Camelot - The Crusader Yearbook</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul style={{listStyle: 'none'}}>
            <li>
                <a href='/merlin'>Merlin</a>
            </li>
            <li>
                <a href='/arthur'>Arthur</a>
            </li>
            <li>
                <a href='/lancelot'>Lancelot</a> 
            </li>
            <li>
                <a href='/morgana'>Morgana</a>
            </li>
          </ul>
          
        </Offcanvas.Body>
      </Navbar.Offcanvas>
      <Button variant='outline-primary' className="mx-3" onClick={handleShow}><FontAwesomeIcon icon={faNavicon}></FontAwesomeIcon></Button>
      <Navbar.Brand href='/dashboard'>Camelot</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            <Button onClick={handleSignOut}>Logout</Button>
    </Navbar>
  }
    </>
  )
}

export default SideBar