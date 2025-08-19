import { useState, useRef } from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import { RoleOnly } from '../access/RoleOnly';

const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const collapseTimer = useRef(null);
    const handleNavClick = () => setExpanded(false);

    // we can change the timer value to something else
    const handleMouseLeave = () => {
        collapseTimer.current = setTimeout(() => {
            setExpanded(false);
        }, 250);
    };

    const handleMouseEnter = () => {
        if (collapseTimer.current) {
            clearTimeout(collapseTimer.current);
            collapseTimer.current = null;
        }
    };

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
                    as={NavLink}
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

                <Navbar.Collapse 
                    id="main-navbar-nav" 
                    className="mx-4 bg-light"
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                >
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/animals">Our Animals</Nav.Link>
                        <Nav.Link as={NavLink} to="/findanimal">Find Your Animal</Nav.Link>
                        <Nav.Link as={NavLink} to="/volunteer">Volunteer</Nav.Link>
                        <Nav.Link as={NavLink} to="/donate">Donate</Nav.Link>

                        
                        <RoleOnly allowedRoles={["public"]}>
                            <ProfileDropdown 
                                dropdownPaths={["/user-profile", "/user-adoptions", "/user-donations"]} 
                                dropdownDescr={["View Profile", "Manage your adoptions", "View your donations"]}
                            />
                        </RoleOnly>

                        {/* TODO: add more options for staff only */}
                        <RoleOnly allowedRoles={["staff"]}>
                            <ProfileDropdown 
                                dropdownPaths={["/user-profile", "/user-adoptions"]} 
                                dropdownDescr={["View Profile", "Manage adoptions"]}
                            />
                        </RoleOnly>
                        
                        <RoleOnly allowedRoles={["guest"]}>
                            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                        </RoleOnly>

                    </Nav>
                </Navbar.Collapse>
                
            </Container>
        </Navbar>
    );
};

export default Header;
