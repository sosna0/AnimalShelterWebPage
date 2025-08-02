import { useState } from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();

    const handleNavClick = () => setExpanded(false);

    return (
        <Navbar
            bg="light"
            expand="lg"
            fixed="top"
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
            className="d-flex align-items-center border-bottom shadow"
        >
            <Container fluid className='p-0'>

                <Navbar.Brand
                    as={Link}
                    to="/"
                    onClick={handleNavClick}
                    className="mx-4 d-flex align-items-center"
                >
                    <Image
                        src="/icons/logo256.png"
                        alt="Shelter Logo"
                        height="40"
                        className="me-2"
                    />
                    <span className="px-2 fw-bold">Animal Shelter</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar-nav" className='mx-4' />

                <Navbar.Collapse id="main-navbar-nav" className="mx-4 bg-light">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" active={location.pathname === "/"} onClick={handleNavClick}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/animals" active={location.pathname === "/animals"} onClick={handleNavClick}>Our Animals</Nav.Link>
                        <Nav.Link as={Link} to="/findanimal" active={location.pathname === "/findanimal"} onClick={handleNavClick}>Find Your Animal</Nav.Link>
                        <Nav.Link as={Link} to="/volunteer" active={location.pathname === "/volunteer"} onClick={handleNavClick}>Volunteer</Nav.Link>
                        <Nav.Link as={Link} to="/donate" active={location.pathname === "/donate"} onClick={handleNavClick}>Donate</Nav.Link>
                        <Nav.Link as={Link} to="/login" active={location.pathname === "/login"} onClick={handleNavClick}>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                
            </Container>
        </Navbar>
    );
};

export default Header;
