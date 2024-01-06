import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

export const Header = () => {

  const dispatch = useDispatch();
  const userReduxData = useSelector(userData);
  const navigate = useNavigate()

  const logMeOut = () => {
    dispatch(logout({ credentials: {}}));
       navigate("/")
  }


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="navBar">
      <Container>
        <Navbar.Brand href="home" id="logo">
          <h2>SURVIVAL ZOMBIE</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
            
          </Nav>
          <Nav>
            {!userReduxData.credentials?.token ? (
              <>
                <NavDropdown title="¡Apúntate!" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="login">Entrar</NavDropdown.Item>
                  <NavDropdown.Item href="register">Unirse</NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              </>
            ) : (
              <>
                {userReduxData.credentials?.user.role === "ADMIN" || userReduxData.credentials?.user.role === "SUPERADMIN" ? (
                  <NavDropdown title="Admin" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="editions">Eventos</NavDropdown.Item>
                    <NavDropdown.Item href="ADMIN">Usuarios</NavDropdown.Item>
                   
                    <NavDropdown.Divider />
                     <NavDropdown.Item href="logout" onClick={()=>logMeOut()}>Cerrar Sesión</NavDropdown.Item>
                  </NavDropdown>
                ) :                 
               <NavDropdown title={userReduxData.credentials?.user.email} id="collasible-nav-dropdown">
                <NavDropdown.Item href="profile">Perfil</NavDropdown.Item>
                <NavDropdown.Item href="editions">Eventos</NavDropdown.Item>
                {userReduxData.credentials?.user.role !== "GUEST" ? (
                <NavDropdown.Item href="characters">Personajes</NavDropdown.Item>
                ) : (null)}
                <NavDropdown.Divider />
                <NavDropdown.Item href="logout" onClick={()=>logMeOut()}>Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
              }
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
