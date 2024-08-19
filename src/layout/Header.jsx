import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import "./Header.css";;

const Header = () => {
  return (
    <Navbar expand="lg" className="bg bg-dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link}to="">My Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
            <Nav.Link as={Link}to="/">AddProducts</Nav.Link>
            <Nav.Link as={Link}to="/viewProduct">ViewProduct</Nav.Link>
            <Nav.Link as={Link}to="service">ProductDetails</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div class="search_bar">
            {/* <span class="material-symbols-outlined search_icon"></span> */}
            <input class="search_input" placeholder="Search for product"/>
        </div>
      </Container>
    </Navbar>
  )
}

export default Header