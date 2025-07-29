import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" fixed="top" className="border-bottom shadow" style={{ height: '60px' }}>
            <Container>
                
                {/* Brand section with logo and name */}
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <Image
                        src="icons/logo256.png"
                        alt="Shelter Logo"
                        height="40"
                        className="d-inline-block me-2"
                    />
                    <span>Animal Shelter</span>
                </Navbar.Brand>

                {/* Navbar toggler for small screens */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Navbar links */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/animals">Our Animals</Nav.Link>
                        <Nav.Link as={Link} to="/findanimal">Find Your Animal</Nav.Link>
                        <Nav.Link as={Link} to="/volunteer">Volunteer</Nav.Link>
                        <Nav.Link as={Link} to="/donate">Donate</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
