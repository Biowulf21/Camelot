import * as React from "react";
import { Alert, Button, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import ProfileCard from "./sub-components/profile-card";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth);
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <>
      {location.pathname === "/" ? null : (
        <Navbar style={{ backgroundColor: "white" }} sticky="top">
          <Offcanvas show={show} onHide={handleClose} responsive="lg">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Camelot - The Crusader Yearbook</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <ProfileCard></ProfileCard>
              </Nav>
              <Nav className="nav-card">
                <Link onClick={handleClose} to={"/merlin"}>
                  Merlin
                </Link>
              </Nav>
              <Nav className="nav-card">
                <Link onClick={handleClose} to={"/arthur"}>
                  Arthur
                </Link>
              </Nav>
              <Nav className="nav-card">
                <Link onClick={handleClose} to={"/"}>
                  Excalibur
                </Link>
              </Nav>
              <Nav className="nav-card">
                <Link onClick={handleClose} to={"/"}>
                  Morgana
                </Link>
              </Nav>
              <Nav className="nav-card">
                <Link onClick={handleClose} to={"/"}>
                  Settings
                </Link>
              </Nav>
              <Nav className="my-3">
                <Button onClick={handleSignOut}>Logout</Button>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
          <Button variant="primary" className="mx-3" onClick={handleShow}>
            <FontAwesomeIcon icon={faNavicon}></FontAwesomeIcon>
          </Button>
          <Navbar.Brand href="/dashboard">Camelot</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Button className="mx-3" onClick={handleSignOut}>
            Logout
          </Button>
        </Navbar>
      )}
    </>
  );
};

export default SideBar;
